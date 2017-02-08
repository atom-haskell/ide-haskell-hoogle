SubAtom = require 'sub-atom'

module.exports =
class HoogleDocView
  constructor: ({@doc}) ->
    # Create root element
    @disposables = new SubAtom

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

    @showDoc(@doc)

  getURI: ->
    "ide-haskell://hoogle/doc/"

  getTitle: ->
    "Hoogle doc"

  destroy: ->
    @element.remove()
    @disposables.dispose()

  showDoc: (doc) ->
    hl = (lines, scope) ->
      html = require('atom-highlight')
        fileContents: lines.join('\n')
        scopeName: scope
        nbsp: false
        lineDivs: true
      if scope is 'text.plain.null-grammar'
        return html
      else
        return "<pre class=\"editor editor-colors\">#{html}</pre>"
    reduce = ({acc, prev, span}, el) ->
      newPrev = el.startsWith('> ')
      if newPrev
        el = el.slice(2)
      scope = if prev then 'source.haskell' else 'text.plain.null-grammar'
      if newPrev is prev
        {acc, span: [span..., el], prev: newPrev}
      else
        {acc: [acc..., hl(span, scope)], span: [el], prev: newPrev}
    {acc, span, prev} = doc.lines.reduce(reduce, {acc: [], span: [], prev: false})
    reduced =
      if prev
        [acc..., hl(span, 'source.haskell')]
      else
        [acc..., hl(span, 'text.plain.null-grammar')]
    @outputDiv.innerHTML = reduced.join('')

    if doc.href?
      link = document.createElement('a')
      link.innerText = 'Open web documentation'
      link.classList.add 'btn', 'btn-default'
      @outputDiv.appendChild link
      @disposables.add link, 'click', ->
        atom.workspace.open "ide-haskell://hoogle/web/",
          searchAllPanes: true
          activatePane: false
          src: doc.href

      link2 = document.createElement('a')
      link2.innerText = 'Open web documentation in browser'
      link2.href = doc.href
      link2.classList.add 'btn', 'btn-default'
      @outputDiv.appendChild link2

  serialize: ->
    deserializer: 'HoogleDocView'
    doc: @doc
