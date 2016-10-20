SubAtom = require 'sub-atom'
{Range, Emitter} = require 'atom'
Util = require 'atom-haskell-utils'

highlightSync = require './highlight'

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
      hl = (lines, scope) ->
        html = highlightSync {fileContents: lines.join('\n'), scopeName: scope}
        if scope is 'text.plain'
          return html
        else
          return "<pre class=\"editor editor-colors\">#{html}</pre>"
      reduce = ({acc, prev, span}, el) ->
        newPrev = el.startsWith('> ')
        if newPrev
          el = el.slice(2)
        scope = if prev then 'source.haskell' else 'text.plain'
        if newPrev is prev
          {acc, span: [span..., el], prev: newPrev}
        else
          {acc: [acc..., hl(span, scope)], span: [el], prev: newPrev}
      {acc, span, prev} = doc.reduce(reduce, {acc: [], span: [], prev: false})
      reduced =
        if prev
          [acc..., hl(span, 'source.haskell')]
        else
          [acc..., hl(span, 'text.plain')]
      @outputDiv.innerHTML = reduced.join('')
