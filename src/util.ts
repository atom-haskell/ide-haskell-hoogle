import { hightlightLines } from 'atom-highlight'

import { HoogleDocView } from './hoogle-doc-view'
import { HoogleWebView } from './hoogle-web-view'

export function hl(lines: string) {
  return Array.from(
    hightlightLines(
      lines.split('\n'),
      'source.haskell',
      'text.plain.null-grammar',
      true,
    ),
  ).join('<br>')
}

export async function openDoc(sym: ISymbol) {
  const view: HoogleDocView = (await atom.workspace.open(
    'ide-haskell://hoogle/doc/',
    {
      split: 'right',
      searchAllPanes: true,
      activatePane: false,
    },
  )) as HoogleDocView
  return view.update({ symbol: sym })
}

export async function openWeb(sym: ISymbol, split = true) {
  const view: HoogleWebView = (await atom.workspace.open(
    `ide-haskell://hoogle/web/`,
    {
      split: split ? 'right' : undefined,
      searchAllPanes: true,
      activatePane: false,
    },
  )) as HoogleWebView
  return view.update({ url: sym.href })
}
