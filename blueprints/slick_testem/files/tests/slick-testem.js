/*
 * param config needs to be QUnit.config
 * - QUnit.config.queue
 * - QUnit.config.stats.all
 * - QUnit.config.stats.bad
 */
window.SlickTestem = function(config) {
  let $slickTestem = $(`
    <div id="slick-testem">
      <span class="tests-ran">0</span> / <span class="tests-total">0</span><br>
    </div>
  `);

  return {

    monitorTimer: null,
    setupTimer: null,

    hasNotifiedFailing: false,

    totalTests() {
      return config.queue.length + config.stats.all;
    },

    testsRun() {
      return config.stats.all;
    },

    isFailing() {
      return config.stats.bad;
    },

    percentComplete() {
      let percent = (this.testsRun() / this.totalTests()) * 100 || 0;
      return percent > 100 ? 100 : percent;
    },

    setupHeader() {
      let $h = $('#qunit-header');

      if ($h.length) {
        let totalTests = this.totalTests();
        $h.append($slickTestem);
        $('.tests-total').text(totalTests);
        $('#qunit-banner').addClass('qunit-pass');
        this.startMonitor();
        window.clearInterval(this.setupTimer);
      }
    },

    updateProgress() {
      $('#qunit-banner').width(`${this.percentComplete()}%`);
      $('.tests-ran').text(this.testsRun());
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
