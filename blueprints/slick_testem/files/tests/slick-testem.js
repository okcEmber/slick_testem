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
      totalTests: 0,
      testsRun: 0,
      monitorTimer: null,
      setupTimer: null,

      percentComplete() {
        return (this.testsRun / this.totalTests) * 100 || 0;
      },

      setupHeader() {
        let $h = $('#qunit-header');

        if ($h.length) {
          $h.append($slickTestem);
          this.totalTests = $('[id^="qunit-test-output"]').length;
          $('.tests-total').text(this.totalTests);
          $('#qunit-banner').addClass('qunit-pass');
          this.startMonitor();
          window.clearInterval(this.setupTimer);
        }
      },

      isFailing() {
        $('#qunit-banner').addClass('qunit-fail');
        return $('.fail').length > 0;
      },

      updateProgress() {
        let selectors = ['[id^="qunit-test-output"].pass',
          '[id^="qunit-test-output"].fail',
          '[id^="qunit-test-output"].skip'];
        this.testsRun = $(selectors.join(', ')).length;

        $('#qunit-banner').width(`${this.percentComplete()}%`);
        $('.tests-ran').text(this.testsRun);
      },

      checkFailing() {
        if (this.isFailing()) {
          $('#slick-testem').addClass('failing');
          this.hasNotifiedFailing = true;
        }
      },

      clearMonitor() {
        if (this.percentComplete() >= 100) {
          window.clearInterval(this.monitorTimer);
        }
      },

      startMonitor() {
        this.monitorTimer = window.setInterval(() => {
          this.checkFailing();
          this.updateProgress();
          this.clearMonitor();
        }, 300);
      },

      go() {
        this.setupTimer = window.setInterval(() => {
          this.setupHeader();
        }, 300);
      }
    };
  };

  let slickTestem = new SlickTestem();
  slickTestem.go();
})(window, document, $);
