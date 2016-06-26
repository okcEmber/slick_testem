/* globals module */

var EOL = require('os').EOL;

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    // Insert Slick JS
    return this.insertIntoFile(
      'tests/index.html',
      '    <script src="assets/slick-testem.js"></script>',
      { after: '<link rel="stylesheet" href="assets/dummy.css">' + EOL }
    ).then(function() {
      // Insert Slick CSS
      return this.insertIntoFile(
        'tests/index.html',
        '    <link rel="stylesheet" href="assets/slick-testem.css"></script>',
        { after: '<link rel="stylesheet" href="assets/test-support.css">' + EOL });
    }.bind(this)).then(function() {
       // Initialize
      return this.insertIntoFile(
        'tests/index.html',
        '<script> (function(window, document, $) { slickTestem = new SlickTestem(QUnit.config); slickTestem.go(); })(window, document, $); </script>',
        { after: '{{content-for "test-body-footer"}}' + EOL }
      );
    }.bind(this));
  }
};
