import { CompositeDisposable } from 'atom'
import * as etch from 'etch'
import cheerio = require('cheerio')
import { hl, openWeb } from './util'

export interface IProps extends JSX.Props {
  symbol?: ISymbol
}

export class HoogleDocView implements JSX.ElementClass {
  public disposables = new CompositeDisposable()
  private style: {
    fontSize?: string
    fontFamily?: string
  } = {}
  private parsedDoc: string = ''
  constructor(public props: IProps = {}) {
    this.updateDoc(props.symbol && props.symbol.doc)
    this.disposables.add(
      atom.config.observe('editor.fontSize', (fontSize: string) => {
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
      // tslint:disable: no-unbound-method
      hrefBtns = [
        (
          <a class="btn btn-default" on={{ click: this.openWebDoc }}>
            Open web documentation
          </a>
        ),
        (
          <a class="btn btn-default" href={this.props.symbol.href}>
            Open web documentation in browser
          </a>
        ),
      ]
      // tslint:enable: no-unbound-method
    }
    return (
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
    const $ = cheerio.load(doc)
    $('pre').each((idx, el) => {
      $(el).replaceWith(hl($(el).text(), false))
    })
    $('a').each((idx, el) => {
      $(el).replaceWith(hl($(el).text().trim(), true))
    })
    this.parsedDoc = $.html()
  }

  private openWebDoc() {
    this.props.symbol && openWeb(this.props.symbol, false)
  }
}
