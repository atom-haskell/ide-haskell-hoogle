SubAtom = require 'sub-atom'
{Range, Emitter} = require 'atom'
Util = require 'atom-haskell-utils'

highlightSync = require './highlight'

module.exports =
class HoogleWebView
  constructor: (src) ->
    # Create root element
    @disposables = new SubAtom
    @disposables.add @emitter = new Emitter

    # Create message element
    @element = document.createElement 'div'
    @element.classList.add('ide-haskell-hoogle')
    @element.appendChild @navbar = document.createElement 'div'
    @navbar.classList.add('ide-haskell-hoogle-web-navbar')
    @navbar.classList.add 'btn-group'
    @navbar.appendChild @backBtn = document.createElement 'button'
    @backBtn.classList.add 'btn', 'btn-default', 'btn-back'
    @navbar.appendChild @forwardBtn = document.createElement 'button'
    @forwardBtn.classList.add 'btn', 'btn-default', 'btn-forward'
    @element.appendChild @webView = document.createElement 'webview'
    @webView.classList.add('ide-haskell-hoogle-web', 'native-key-bindings')
    @webView.tabIndex = -1
    @webView.src = src

    @disposables.add atom.config.observe 'ide-haskell-hoogle.webZoomFactor', (@zoomFactor) =>
      @webView.setZoomFactor(@zoomFactor / 100)
    @disposables.add @webView, 'dom-ready', =>
      @webView.setZoomFactor(@zoomFactor / 100)

    @disposables.add @backBtn, 'click', =>
      atom.commands.dispatch @webView, 'ide-haskell-hoogle:web-go-back'
    @disposables.add @forwardBtn, 'click', =>
      atom.commands.dispatch @webView, 'ide-haskell-hoogle:web-go-forward'

  getURI: ->
    "ide-haskell://hoogle/web/"

  getTitle: ->
    "Hoogle web"

  onDidDestroy: (callback) ->
    @emitter.on 'did-destroy', callback

  destroy: ->
    @ghci?.destroy?()
    @element.remove()
    @emitter.emit 'did-destroy'
    @disposables.dispose()
