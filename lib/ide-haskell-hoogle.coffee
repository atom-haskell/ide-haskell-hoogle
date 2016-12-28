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

    atom.packages.onDidTriggerActivationHook 'language-haskell:grammar-used', =>
      @reallyActivate(state)

  createDocView: ({doc}) ->
    HoogleDocView = require './hoogle-doc-view'
    view = new HoogleDocView({doc})

  createWebView: ({src}) ->
    HoogleWebView = require './hoogle-web-view'
    view = new HoogleWebView({src})

  reallyActivate: (state) ->
    Hoogle = require './hoogle'
    @hoogle = new Hoogle()

    @disposables.add atom.workspace.addOpener (uriToOpen, options) ->
      m = uriToOpen.match(/^ide-haskell:\/\/hoogle\/(doc|web)\/(.*)$/)
      unless m? and m[1]?
        return
      switch m[1]
        when 'doc'
          IdeHaskellHoogle.createDocView(options)
        when 'web'
          IdeHaskellHoogle.createWebView(options)

    @disposables.add atom.commands.add 'webview.ide-haskell-hoogle-web',
      'ide-haskell-hoogle:web-go-back': ({currentTarget}) ->
        currentTarget.goBack()
      'ide-haskell-hoogle:web-go-forward': ({currentTarget}) ->
        currentTarget.goForward()

    @disposables.add atom.commands.add 'atom-text-editor',
      'ide-haskell-hoogle:show-doc-for-symbol':  ({currentTarget}) =>
        ed = currentTarget.getModel()
        symbol = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition())?.value
        if symbol?
          @hoogle.getDocForSymbol(symbol, true)
          .then (doc) => @openDoc(doc)
      'ide-haskell-hoogle:search-for-symbol':  ({currentTarget}) =>
        ed = currentTarget.getModel()
        symbol = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition())?.value
        if symbol?
          @hoogle.searchForSymbol(symbol)
          .then (symbols) =>
            ListView = require './list-view'
            new ListView
              items: symbols
              onConfirmed: ({index}) =>
                @hoogle.getDocForSymbol(symbol, false, index)
                .then (doc) => @openDoc(doc)
      'ide-haskell-hoogle:search-for-symbol-exact':  ({currentTarget}) =>
        ed = currentTarget.getModel()
        symbol = ed.tokenForBufferPosition(ed.getLastCursor().getBufferPosition())?.value
        if symbol?
          @hoogle.searchForSymbol(symbol, true)
          .then (symbols) =>
            ListView = require './list-view'
            new ListView
              items: symbols
              onConfirmed: ({index}) =>
                @hoogle.getDocForSymbol(symbol, true, index)
                .then (doc) => @openDoc(doc)


    @disposables.add atom.menu.add [
      'label': 'Haskell IDE'
      'submenu': [
        'label': 'Open Hoogle Doc'
        'command': 'ide-haskell-hoogle:toggle'
      ]
    ]

  openDoc: (doc) ->
    atom.workspace.open "ide-haskell://hoogle/doc/",
      split: 'right'
      searchAllPanes: true
      activatePane: false
      doc: doc

  openWeb: (href) ->
    atom.workspace.open "ide-haskell://hoogle/web/",
      split: 'right'
      searchAllPanes: true
      activatePane: false
      src: href

  deactivate: ->
    @hoogle = null
    @disposables.dispose()
