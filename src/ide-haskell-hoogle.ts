import { TextEditor, TextEditorElement, CompositeDisposable } from 'atom'
import { HoogleDocView as HoogleDocViewT, IProps as DocProps } from './hoogle-doc-view'
import { HoogleWebView as HoogleWebViewT, IProps as WebProps } from './hoogle-web-view'
import { Hoogle as HoogleT } from './hoogle'
export { config } from './config'

const disposables = new CompositeDisposable()
let hoogle: HoogleT

export function activate(state: never) {
  const disp = atom.packages.onDidTriggerActivationHook(
    'language-haskell:grammar-used',
    () => {
      disp.dispose()
      reallyActivate(state)
      .catch((e) => atom.notifications.addFatalError(
        'Failed to activate ide-haskell-hoogle', {
          stack: (e as Error).stack,
          dismissable: true,
          detail: e,
        },
      ))
    },
  )
}

export function createDocView(props: DocProps = {}): HoogleDocViewT {
  // tslint:disable-next-line:no-unsafe-any
  const { HoogleDocView }: {HoogleDocView: typeof HoogleDocViewT} = require('./hoogle-doc-view')
  return new HoogleDocView(props)
}

export function createWebView(props: WebProps = {}): HoogleWebViewT {
  // tslint:disable-next-line:no-unsafe-any
  const { HoogleWebView }: {HoogleWebView: typeof HoogleWebViewT} = require('./hoogle-web-view')
  return new HoogleWebView(props)
}

async function showDoc(ed: TextEditor, func: (sym: ISymbol) => void) {
  const token = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition())
  const { selectListView } = await import('./list-view')
  if (token) {
    const symbol = token.value
    const symbols = await hoogle.searchForSymbol(symbol)
    const item = await selectListView(symbols)
    if (item) {
      func(item)
    }
  }
}

async function reallyActivate(_state: never) {
  if (hoogle) { return }
  const { Hoogle } = await import('./hoogle')
  const { openDoc, openWeb } = await import('./util')
  hoogle = new Hoogle()
  disposables.add(hoogle)

  disposables.add(atom.workspace.addOpener((uriToOpen: string) => {
    const m = uriToOpen.match(/^ide-haskell:\/\/hoogle\/(doc|web)\/(.*)$/)
    if (!(m && m[1])) {
      return undefined
    }
    switch (m[1]) {
      case 'doc':
        return createDocView()
      case 'web':
        return createWebView({url: m[2] || undefined})
    }
    return undefined
  }))

  disposables.add(
    atom.commands.add('webview.ide-haskell-hoogle-web', {
      'ide-haskell-hoogle:web-go-back':
      (ev) =>
        (ev.currentTarget as Electron.WebViewElement).goBack(),
      'ide-haskell-hoogle:web-go-forward':
      (ev) =>
        (ev.currentTarget as Electron.WebViewElement).goForward(),
    }),
    atom.commands.add('atom-text-editor', {
      'ide-haskell-hoogle:show-doc-for-symbol':
        async ({ currentTarget }) => showDoc((currentTarget as TextEditorElement).getModel(), openDoc),
      'ide-haskell-hoogle:show-web-doc-for-symbol':
        async ({ currentTarget }) => showDoc((currentTarget as TextEditorElement).getModel(), openWeb),
    }),
  )
}

export function deactivate() {
  disposables.dispose()
}
