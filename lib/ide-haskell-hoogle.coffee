module.exports = IdeHaskellHoogle =
  config:
    hooglePath:
      type: 'string'
      default: 'hoogle'
      description: '''
      Path to hoogle executable
      '''
      order: 10
    webZoomFactor:
      type: 'integer'
      description: 'Zoom factor for web view, in %'
      default: 100
      minimum: 50
      maximum: 300
  activate: (state) ->
    {CompositeDisposable} = require 'atom'
    @disposables = new CompositeDisposable

    Hoogle = require './hoogle'
    @hoogle = new Hoogle()

    @disposables.add atom.workspace.addOpener (uriToOpen, options) =>
      m = uriToOpen.match(/^ide-haskell:\/\/hoogle\/(doc|web)\/(.*)$/)
      unless m? and m[1]?
        return
      switch m[1]
        when 'doc'
          HoogleDocView = require './hoogle-doc-view'
          view = new HoogleDocView(@hoogle)
          return view
        when 'web'
          HoogleWebView = require './hoogle-web-view'
          view = new HoogleWebView(options.src)
          return view

    @disposables.add atom.commands.add 'webview.ide-haskell-hoogle-web',
      'ide-haskell-hoogle:web-go-back': ({target}) ->
        target.goBack()
      'ide-haskell-hoogle:web-go-forward': ({target}) ->
        target.goForward()

    @disposables.add atom.commands.add 'atom-text-editor',
      'ide-haskell-hoogle:show-doc-for-symbol':  ({target}) =>
        ed = target.getModel()
        symbol = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition())?.value
        if symbol?
          @open()
          .then (model) ->
            model.showDocFor(symbol, true)
      'ide-haskell-hoogle:search-for-symbol':  ({target}) =>
        ed = target.getModel()
        symbol = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition())?.value
        if symbol?
          @hoogle.searchForSymbol(symbol)
          .then (symbols) =>
            ListView = require './list-view'
            new ListView
              items: symbols
              onConfirmed: ({index}) =>
                @open()
                .then (model) ->
                  model.showDocFor(symbol, false, index)
      'ide-haskell-hoogle:search-for-symbol-exact':  ({target}) =>
        ed = target.getModel()
        symbol = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition())?.value
        if symbol?
          @hoogle.searchForSymbol(symbol, true)
          .then (symbols) =>
            ListView = require './list-view'
            new ListView
              items: symbols
              onConfirmed: ({index}) =>
                @open()
                .then (model) ->
                  model.showDocFor(symbol, true, index)


    @disposables.add atom.menu.add [
      'label': 'Haskell IDE'
      'submenu': [
        'label': 'Open Hoogle Doc'
        'command': 'ide-haskell-hoogle:toggle'
      ]
    ]

  open: ->
    atom.workspace.open "ide-haskell://hoogle/doc/",
      split: 'right'
      searchAllPanes: true
      activatePane: false

  openWeb: (href) ->
    atom.workspace.open "ide-haskell://hoogle/web/",
      split: 'right'
      searchAllPanes: true
      activatePane: false
      src: href

  deactivate: ->
    @hoogle = null
    @disposables.dispose()
