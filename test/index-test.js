var vows = require('vows');
var assert = require('assert');
var util = require('util');
var angellist = require('..');


vows.describe('passport-angellist').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(angellist.version);
    },
  },
  
}).export(module);
