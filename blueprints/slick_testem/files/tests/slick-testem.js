(function(window, document, $) {
  'use strict';
  let SlickTestem = function() {
    let $slickTestem = $(`
      <div id="slick-testem">
        <span class="tests-ran">0</span> / <span class="tests-total">0</span><br>
      </div>
    `);

    return {
      hasNotifiedFailing: false,

      setupHeader() {
        $('#qunit-header').append($slickTestem);
        $('.tests-total').text($('[id^="qunit-test-output"]').length);
      },

      isFailing() {
        return $('.fail').length > 0;
      },

      updateProgress() {
        let selectors = ['[id^="qunit-test-output"].pass',
          '[id^="qunit-test-output"].fail',
          '[id^="qunit-test-output"].skip'];
        $('.tests-ran').text($(selectors.join(', ')).length);
      },

      checkFailing() {
        if (this.isFailing()) {
          $('#slick-testem').addClass('failing');
          this.hasNotifiedFailing = true;
        }
      },

      go() {
        this.monitorTimer = window.setInterval(() => {
          this.checkFailing();
          this.updateProgress();
        }, 300);

        this.setupTimer = window.setTimeout(() => {
          this.setupHeader();
        }, 3000); // lazy timer
      }
    };
  };

  let slickTestem = new SlickTestem();
  slickTestem.go();
})(window, document, $);
