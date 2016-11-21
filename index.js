var native = require('bindings')('dsfmt_js_nv');
var warp = require('./lib/warp.js')(native);

module.exports = warp;
