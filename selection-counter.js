
/* global chrome:false, safari:false, $:false, pluralize:false, PeripheryLabel:false, SelectionListener:false */


(function (window, document, undefined) {

  /*
   * Watches the current selection and displays a count of a noun in a label.
   *
   * If multiple SelectionCounter instances exist, they will be grouped together.
   *
   * If instantiated in a browser extension context (e.g., safari, chrome), will
   * listen for messages:
   * - Chrome: message.toggle will toggle state, message.active (boolean) will set state
   * - Safari: event.name === 'toggle' will toggle state, (event.name === 'active' && event.message) will set state
   *
   * And may send messages to browser runtime / tab:
   * - Chrome: sendMessage({ active: false }) when deactivated, sendMessage({ active: true }) when activated
   * - Safari: dispatchMessage('active', false) when deactivated, dispatchMessage('active', true) when activated
   *
   * Parameters:
   * - countedNoun (string): Thing to be counted. Options: "character", "word". (default: "character")
   */
  function SelectionCounter(countedNoun) {
    countedNoun = countedNoun || 'character';

    this.countedNoun = countedNoun;
    this.active = false;

    // Instantiate label and and listeners
    this.label = new PeripheryLabel(this.countedNoun);
    this.selectionListener = new SelectionListener(window);

    var self = this;

    // Listen for selection changes and show/hide the label based on the number of counted nouns selected
    $(window).on(SelectionListener.SELECTION_CHANGE_EVENT, function (event) {
      if (self.active) {
        var count = event.selection ? event.selection[self.countedNoun + 'Count'] : 0;
        if (!count) {
          self.label.hide();
        } else {
          var message = count + ' ' + pluralize(self.countedNoun, count);
          self.label.show(message);
        }
      }
    });

    // Listen for messages from other parts of the extension to start/stop selection listening
    if (chrome) {
      chrome.runtime.onMessage.addListener(function (message) {
        if (self.active && message.toggle) {
          self.selectionListener.toggle();
        }
      });

      chrome.runtime.onMessage.addListener(function (message) {
        if (self.active && message.active !== undefined) {
          if (message.active) {
            self.selectionListener.start();
          } else {
            self.selectionListener.stop();
          }
        }
      });
    } else if (safari) {
      safari.self.addEventListener('message', function (message) {
        if (message.name === 'toggle') {
          self.selectionListener.toggle();
        }
      }, false);

      safari.self.addEventListener('message', function (event) {
        if (self.active && event.name === 'active') {
          if (event.message) {
            self.selectionListener.start();
          } else {
            self.selectionListener.stop();
          }
        }
      }, false);
    }

    // On ESC key down, deactivate the extension
    $(document).on('keydown', function (event) {
      if (self.active && event.which === 27) { // ESC key
        self.selectionListener.stop();

        // Send message about deactivation to other parts of extension
        if (chrome) {
          chrome.runtime.sendMessage({ active: false });
        } else if (safari) {
          safari.self.tab.dispatchMessage('active', false);
        }
      }
    });
  }

  /*
   * Start counter
   */
  SelectionCounter.prototype.start = function () {
    this.active = true;
  };

  /*
   * Stop counter
   */
  SelectionCounter.prototype.stop = function () {
    this.label.hide();
    this.active = false;
  };

  window.SelectionCounter = SelectionCounter;

})(this, document);
