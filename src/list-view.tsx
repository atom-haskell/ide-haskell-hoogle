import SelectListView = require('atom-select-list')
import {Panel} from 'atom'
import * as etch from 'etch'
import {hl} from './util'

export async function selectListView (
  items: ISymbol[]
): Promise<ISymbol|undefined> {
  let panel: Panel | undefined
  let res: ISymbol | undefined
  let refocus: HTMLElement | undefined
  try {
    res = await new Promise<ISymbol|undefined>((resolve, reject) => {
      const select = new SelectListView<ISymbol>({
        items,
        itemsClassList: ['ide-haskell'],
        elementForItem: (item: ISymbol) =>
          etch.render(
            <li class="two-lines">
              <span class="primary-line" innerHTML={hl(item.signature || '', true)}/>
              <span class="secondary-line">{item.mod || ''}</span>
            </li>
          ) as HTMLElement,
        filterKeyForItem: (item) => item.signature,
        didCancelSelection: () => {
          resolve()
        },
        didConfirmSelection: (item) => {
          resolve(item)
        }
      })
      select.element.classList.add('ide-haskell')
      panel = atom.workspace.addModalPanel({
        item: select,
        visible: true
      })
      if (document.activeElement instanceof HTMLElement) {
        refocus = document.activeElement
      }
      select.focus()
    })
  } finally {
    panel && panel.destroy()
    refocus && refocus.focus()
  }
  return res
}
