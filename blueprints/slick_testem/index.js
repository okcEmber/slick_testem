/* globals module */

var EOL = require('os').EOL;

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.insertIntoFile(
      'tests/index.html',
      '    <script>alert("hello");</script>',
      { after: '<script src="assets/test-loader.js"></script>' + EOL }
    );
  }
};
