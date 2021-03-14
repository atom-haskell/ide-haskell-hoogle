// tslint:disable: jsx-no-multiline-js
import { CompositeDisposable } from 'atom'
import type { WebviewTag } from 'electron'
import * as etch from 'etch'

export interface IProps extends JSX.Props {
  url?: string
}

type ElementClass = JSX.ElementClass

export class HoogleWebView implements ElementClass {
  private disposables = new CompositeDisposable()
  private zoomFactor = 100
  private refs!: {
    webView?: WebviewTag
  }
  private canShowWebview = false
  constructor(public props: IProps = {}) {
    etch.initialize(this)
    // Create message element

    this.disposables.add(
      atom.config.observe(
        'ide-haskell-hoogle.webZoomFactor',
        (zoomFactor: number) => {
          this.zoomFactor = zoomFactor
          // tslint:disable-next-line: no-floating-promises
          etch.update(this)
        },
      ),
    )
    this.canShowWebview = atom.packages.hasActivatedInitialPackages()
    if (!this.canShowWebview) {
      const disp = atom.packages.onDidActivateInitialPackages(() => {
        disp.dispose()
        this.canShowWebview = true
        // tslint:disable-next-line: no-floating-promises
        etch.update(this)
      })
    }
  }

  public render() {
    return (
      <div class="ide-haskell-hoogle">
        <div class="ide-haskell-hoogle-web-navbar btn-group">
          <button
            class="btn btn-default btn-back"
            on={{
              click: () => {
                this.refs.webView &&
                  atom.commands.dispatch(
                    this.refs.webView,
                    'ide-haskell-hoogle:web-go-back',
                  )
              },
            }}
          />
          <button
            class="btn btn-default btn-forward"
            on={{
              click: () => {
                this.refs.webView &&
                  atom.commands.dispatch(
                    this.refs.webView,
                    'ide-haskell-hoogle:web-go-forward',
                  )
              },
            }}
          />
        </div>
        {this.webview()}
      </div>
    )
  }

  public async update(props: IProps) {
    if (this.props.url !== props.url) {
      this.props.url = props.url
      // this.refs.webView
      // && props.url
      // && this.refs.webView.loadURL(props.url)
    }
    return etch.update(this)
  }

  public getURI() {
    return `ide-haskell://hoogle/web/${this.props.url ?? ''}`
  }

  public getTitle() {
    return 'Hoogle web'
  }

  public destroy() {
    this.disposables.dispose()
    // tslint:disable-next-line:no-floating-promises
    etch.destroy(this)
  }

  public serialize(): IProps & { deserializer: string } {
    return {
      ...this.props,
      deserializer: 'HoogleWebView',
    }
  }

  private setZoom = () => {
    this.refs.webView && this.refs.webView.setZoomFactor(this.zoomFactor / 100)
  }

  private didNavigate = ({ url }: { url: string }) => {
    this.props.url = url
  }

  private webview() {
    // tslint:disable-next-line: no-null-keyword
    if (!this.canShowWebview) return null
    return (
      <webview
        ref="webView"
        class="ide-haskell-hoogle-web native-key-bindings"
        src={this.props.url}
        tabIndex="-1"
        on={{
          'dom-ready': this.setZoom,
          'did-navigate': this.didNavigate,
          'did-navigate-in-page': this.didNavigate,
        }}
      />
    )
  }
}
