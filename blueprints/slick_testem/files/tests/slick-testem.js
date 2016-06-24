(function(window, document, $) {
  "use strict";
  var SlickTestem = function() {
    var $slickTestem = $(`
      <div style="float:right;" id="slick-testem">
        <span class="tests-ran">0</span> / <span class="tests-total">0</span><br>
      </div>
    `);

    return {
      hasNotifiedFailing: false,

      setupHeader: function() {
        $('#qunit-header').append($slickTestem);
        $('.tests-total').text($('[id^="qunit-test-output"]').length);
      },

      isFailing: function() {
        return $('.fail').length > 0;
      },

      updateProgress: function() {
        var selectors = ['[id^="qunit-test-output"].pass',
          '[id^="qunit-test-output"].fail',
          '[id^="qunit-test-output"].skip'];
        $('.tests-ran').text($(selectors.join(', ')).length);
      },

      checkFailing: function () {
        if(this.isFailing() && !this.hasNotifiedFailing) {
          $('#slick-testem').addClass('failing');
          this.hasNotifiedFailing = true;
        }
      },

      go: function() {
        this.monitorTimer = window.setInterval(() => {
          this.checkFailing();
          this.updateProgress();
        }, 300);

        this.setupTimer = window.setTimeout(() => {
          this.setupHeader();
        }, 1000); // lazy timer
      }
    };
  };

  var a
  var slickTestem = new SlickTestem();
  slickTestem.go();
})(window, document, $);
