/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'slick-testem',
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },
  postprocessTree: function(type, tree) {
    if (type === 'all' && this.app.tests) {
      var tests = this.treeGenerator(path.join(this.project.root, 'tests'));
      var slickFiles = new Funnel(tests, {
        files: ['slick-testem.js', 'slick-testem.css'],
        srcDir: '/',
        destDir: '/assets'
      });

      return mergeTrees([tree, slickFiles], {
        overwrite: true
      });
    } else {
      return tree;
    }
  }
};
