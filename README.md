[![Build status](https://img.shields.io/travis/jbrudvik/selection-counter.svg)](https://travis-ci.org/jbrudvik/selection-counter)
[![Bower version](http://img.shields.io/bower/v/selection-counter.svg)](https://github.com/jbrudvik/selection-counter)

  - [SelectionCounter()](#selectioncountercountednounstring)
  - [SelectionCounter.start()](#selectioncounterstart)
  - [SelectionCounter.stop()](#selectioncounterstop)

## SelectionCounter(countedNoun:String)

  Watches the current selection and displays a count of a noun in a label.
  
  If multiple SelectionCounter instances exist, they will be grouped together.
  
  If instantiated in a browser extension context (e.g., safari, chrome), will
  listen for messages:
  
  - Chrome: `message.active` (boolean) will set state
  - Safari: `event.name === 'active' && event.message` will set state
  
  And may send messages to browser runtime / tab:
  
  - Chrome: `sendMessage({ active: false })` when deactivated, `sendMessage({ active: true })` when activated
  - Safari: `dispatchMessage('active', false)` when deactivated, `dispatchMessage('active', true)` when activated
  
  Browser support:
  
  - Chrome
  - Safari
  
  Parameters:
  
  - countedNoun (String): Thing to be counted. Options: "character", "word". (default: "character")

## SelectionCounter.start()

  Start counter

## SelectionCounter.stop()

  Stop counter

# Development

## Generate documentation

    $ npm install -g dox
    $ ./generate-docs > README.md

## Deploy

Where X.Y.Z is the new version number:

    $ git tag -a vX.Y.Z
    $ git push --tags
