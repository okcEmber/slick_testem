(function(window, document, $) {
  "use strict";
  var SlickTestem = function() {
    return {
      hasNotifiedFailing: false,
      isFailing: function() {
        return document.querySelectorAll ('.fail').length > 0;
      },

      checkFailing: function () {
        if(this.isFailing && !this.hasNotifiedFailing) {
          $('#qunit-header').append ($('<div>epic fail!</div>'));
          this.hasNotifiedFailing = true;
        }
      },

      monitor: function() {
        var self = this;
        window.setInterval(function () {
          self.checkFailing();
        }, 300);
      }
    };
  };

  var slickTestem = new SlickTestem();
  slickTestem.monitor();
})(window, document, $);
