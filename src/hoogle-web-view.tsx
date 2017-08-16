import {CompositeDisposable} from 'atom'
import * as etch from 'etch'

export interface IProps extends JSX.Props {
  url?: string
}

export class HoogleWebView implements JSX.ElementClass {
  private disposables = new CompositeDisposable()
  private zoomFactor = 100
  private refs: {
    webView: Electron.WebViewElement
  }
  constructor (public props: IProps = {}) {
    etch.initialize(this)
    // Create message element

    this.disposables.add(
      atom.config.observe('ide-haskell-hoogle.webZoomFactor', (zoomFactor: string) => {
        this.zoomFactor = parseInt(zoomFactor, 10)
        etch.update(this)
      })
    )
  }

  public render () {
    return (
      <div class="ide-haskell-hoogle">
        <div class="ide-haskell-hoogle-web-navbar btn-group">
          <button
            class="btn btn-default btn-back"
            on={{click: () => {
              atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-back')
            }}}
          />
          <button
            class="btn btn-default btn-forward"
            on={{click: () => {
              atom.commands.dispatch(this.refs.webView, 'ide-haskell-hoogle:web-go-forward')
            }}}
          />
        </div>
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
      </div>
    )
  }

  public async update (props: IProps) {
    if (this.props.url !== props.url) {
      this.props.url = props.url
      // this.refs.webView
      // && props.url
      // && this.refs.webView.loadURL(props.url)
    }
    return etch.update(this)
  }

  public getURI () {
    return 'ide-haskell://hoogle/web/'
  }

  public getTitle () {
    return 'Hoogle web'
  }

  public destroy () {
    this.disposables.dispose()
    etch.destroy(this)
  }

  public serialize (): IProps & {deserializer: string} {
    return {
      ...this.props,
      deserializer: 'HoogleWebView',
    }
  }

  private setZoom () {
    this.refs.webView.setZoomFactor(this.zoomFactor / 100)
  }

  private didNavigate ({url}: {url: string}) {
    this.props.url = url
  }
}
