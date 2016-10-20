{SelectListView} = require 'atom-space-pen-views'

module.exports=
class ListView extends SelectListView
  initialize: ({@onConfirmed, items}) ->
    super
    @panel = atom.workspace.addModalPanel
      item: this
      visible: false
    @addClass 'ide-haskell'
    @show items

  cancelled: ->
    @panel.destroy()

  getFilterKey: ->
    "text"

  show: (list) ->
    @setItems list
    @panel.show()
    @storeFocusedElement()
    @focusFilterEditor()

  viewForItem: (item) ->
    """
    <li>
      <span class=signature>#{item.signature}</span>
      <span class=module>#{item.mod}</span>
      <span class=match>#{item.match}</span>
    </li>
    """

  confirmed: (item) ->
    @onConfirmed? item
    @cancel()
