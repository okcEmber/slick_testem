/* globals module */

var EOL = require('os').EOL;

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.insertIntoFile(
      'tests/index.html',
      '    <script src="assets/slick-testem.js"></script>',
      { after: '<script src="assets/test-loader.js"></script>' + EOL }
    ).then(function() {
      return this.insertIntoFile(
        'tests/index.html',
        '    <link rel="stylesheet" href="assets/slick-testem.css"></script>',
        { after: '<link rel="stylesheet" href="assets/test-support.css">' + EOL });
    }.bind(this));
  }
};
