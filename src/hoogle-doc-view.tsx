import { CompositeDisposable } from 'atom'
import * as etch from 'etch'
import { hl, openWeb } from './util'

export interface IProps extends JSX.Props {
  symbol?: ISymbol
}

type ElementClass = JSX.ElementClass

export class HoogleDocView implements ElementClass {
  public disposables = new CompositeDisposable()
  private style: {
    fontSize?: string
    fontFamily?: string
  } = {}
  private parsedDoc: string = ''
  constructor(public props: IProps = {}) {
    this.updateDoc(props.symbol && props.symbol.doc)
    this.disposables.add(
      atom.config.observe('editor.fontSize', (fontSize: number) => {
        if (fontSize) {
          this.style.fontSize = `${fontSize}px`
        }
      }),
      atom.config.observe('editor.fontFamily', (fontFamily: string) => {
        if (fontFamily) {
          this.style.fontFamily = fontFamily
        }
      }),
    )
    etch.initialize(this)
  }

  public render() {
    let hrefBtns: JSX.Element[] = []
    if (this.props.symbol && this.props.symbol.href) {
      hrefBtns = [
        (
          // tslint:disable:no-unsafe-any
          <a class="btn btn-default" on={{ click: this.openWebDoc }}>
            Open web documentation
          </a>
          // tslint:enable:no-unsafe-any
        ),
        (
          // tslint:disable:no-unsafe-any
          <a class="btn btn-default" href={this.props.symbol.href}>
            Open web documentation in browser
          </a>
          // tslint:enable:no-unsafe-any
        ),
      ]
    }
    return (
      // tslint:disable:no-unsafe-any
      <div class="ide-haskell-hoogle">
        <div
          style={this.style}
          innerHTML={hl(this.props.symbol && this.props.symbol.signature || '', true)}
        />
        <div>{hrefBtns}</div>
        <div
          class="ide-haskell-hoogle-output editor editor-colors native-key-bindings"
          style={this.style}
          tabIndex="-1"
          innerHTML={this.parsedDoc}
        />
      </div>
      // tslint:enable:no-unsafe-any
    )
  }

  public async update(props: IProps) {
    if ((this.props.symbol && this.props.symbol.doc)
      !== (props.symbol && props.symbol.doc)) {
      this.updateDoc(props.symbol && props.symbol.doc)
    }
    this.props = props
    return etch.update(this)
  }

  public getURI() {
    return 'ide-haskell://hoogle/doc/'
  }

  public getTitle() {
    return 'Hoogle doc'
  }

  public destroy() {
    // tslint:disable-next-line:no-floating-promises
    etch.destroy(this)
    this.disposables.dispose()
  }

  public serialize(): IProps & { deserializer: string } {
    return {
      ...this.props,
      deserializer: 'HoogleDocView',
    }
  }

  private updateDoc(doc: string | undefined) {
    if (!doc) {
      this.parsedDoc = 'No documentation'
      return
    }
    const div = document.createElement('div')
    div.innerHTML = doc
    div.querySelectorAll('pre').forEach((el) => {
      el.outerHTML = hl(el.innerText, false)
    })
    div.querySelectorAll('a').forEach((el) => {
      el.outerHTML = hl(el.innerText.trim(), true)
    })
    this.parsedDoc = div.innerHTML
  }

  private openWebDoc = () => {
    this.props.symbol && openWeb(this.props.symbol, false)
  }
}
