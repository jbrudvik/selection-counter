[![Bower version](http://img.shields.io/bower/v/selection-counter.svg)](https://github.com/jbrudvik/selection-counter)

  - [SelectionCounter()](#selectioncounter)
  - [SelectionCounter.start()](#selectioncounterstart)
  - [SelectionCounter.stop()](#selectioncounterstop)

## SelectionCounter()

  Watches the current selection and displays a count of a noun in a label.
  
  If multiple SelectionCounter instances exist, they will be grouped together.
  
  If instantiated in a browser extension context (e.g., safari, chrome), will
  listen for messages:
  
  - Chrome: `message.toggle` will toggle state, `message.active` (boolean) will set state
  - Safari: `event.name === 'toggle'` will toggle state, `event.name === 'active' && event.message` will set state
  
  And may send messages to browser runtime / tab:
  
  - Chrome: `sendMessage({ active: false })` when deactivated, `sendMessage({ active: true })` when activated
  - Safari: `dispatchMessage('active', false)` when deactivated, `dispatchMessage('active', true)` when activated
  
  Parameters:
  
  - countedNoun (string): Thing to be counted. Options: "character", "word". (default: "character")

## SelectionCounter.start()

  Start counter

## SelectionCounter.stop()

  Stop counter

# Generating documentation

    $ npm install -g dox
    $ ./generate-docs
