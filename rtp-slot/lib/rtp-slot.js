RTPSlot = require './rtp-slot-view'
{CompositeDisposable} = require 'atom'

module.exports = RTPSlot =
  RTPSlotView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @RTPSlotView = new RTPSlotView(state.RTPSlotViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @RTPSlotView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'RTPSlot:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @RTPSlotView.destroy()

  serialize: ->
    RTPSlotViewState: @RTPSlotView.serialize()

  toggle: ->
    console.log 'RTPSlot was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
