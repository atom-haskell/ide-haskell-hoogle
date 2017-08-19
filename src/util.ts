import highlight = require('atom-highlight')

import { HoogleDocView } from './hoogle-doc-view'
import { HoogleWebView } from './hoogle-web-view'

export function hl(lines: string, inline: boolean) {
  return highlight({
    fileContents: lines,
    scopeName: 'source.haskell',
    nbsp: true,
    lineDivs: !inline,
    editorDivTag: inline ? 'span' : 'pre',
    editorDiv: true,
  })
}

export async function openDoc(sym: ISymbol) {
  const view: HoogleDocView = await atom.workspace.open('ide-haskell://hoogle/doc/', {
    split: 'right',
    searchAllPanes: true,
    activatePane: false,
  })
  view.update({ symbol: sym })
}

export async function openWeb(sym: ISymbol, split = true) {
  const view: HoogleWebView = await atom.workspace.open(`ide-haskell://hoogle/web/`, {
    split: split ? 'right' : undefined,
    searchAllPanes: true,
    activatePane: false,
  })
  view.update({ url: sym.href })
}
