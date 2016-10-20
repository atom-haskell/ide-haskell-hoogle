SubAtom = require 'sub-atom'
{Range, Emitter} = require 'atom'
Util = require 'atom-haskell-utils'

Highlights = require 'highlights'

termEscapeRx = /\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g

module.exports =
class HoogleDocView
  constructor: (@hoogle) ->
    # Create root element
    @disposables = new SubAtom
    @disposables.add @emitter = new Emitter

    # Create message element
    @element = document.createElement 'div'
    @element.classList.add('ide-haskell-hoogle')
    @element.appendChild @outputDiv = document.createElement 'div'
    @outputDiv.classList.add('ide-haskell-hoogle-output', 'editor', 'editor-colors', 'native-key-bindings')
    @outputDiv.tabIndex = -1
    @disposables.add atom.config.observe 'editor.fontSize', (fontSize) =>
      if fontSize?
        @outputDiv.style.fontSize = "#{fontSize}px"
    @disposables.add atom.config.observe 'editor.fontFamily', (fontFamily) =>
      if fontFamily
        @outputDiv.style.fontFamily = fontFamily

    @highlighter = new Highlights(registry: atom.grammars)

  getURI: ->
    "ide-haskell://hoogle/doc/"

  getTitle: ->
    "Hoogle doc"

  onDidDestroy: (callback) ->
    @emitter.on 'did-destroy', callback

  destroy: ->
    @ghci?.destroy?()
    @element.remove()
    @emitter.emit 'did-destroy'
    @disposables.dispose()

  showDocFor: (s, e, i) ->
    @hoogle.getDocForSymbol(s, e, i)
    .then (doc) =>
      @highlighter.highlight {fileContents: doc, scopeName: 'text.tex.latex.haskell'},
        (err, html) =>
          console.error(err) if err
          @outputDiv.innerHTML = html.replace(/&nbsp;/g, ' ') if html?
          @outputDiv.innerHTML = @outputDiv.firstElementChild.innerHTML
