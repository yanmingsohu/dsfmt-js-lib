var dsfmt = require('../');
var str = require('fs').readFileSync(__dirname + '/test-data.json', 'utf8');
var out = JSON.parse(str);

if (out.DSFMT_MEXP != dsfmt.DSFMT_MEXP) {
  throw new Error('fail DSFMT_MEXP ' + out.DSFMT_MEXP + '!=' + dsfmt.DSFMT_MEXP);
}

for (var seed in out) {
  gen(seed);
}

console.log('success.', out.DSFMT_MEXP);


function gen(seed) {
  var mt = dsfmt.create(seed);
  for (var i=0; i<20000; ++i) {
    var f = mt.next();
    if (out[seed][i]) {
      if (out[seed][i] != f) {
        throw new Error('fail, seed='+ seed + ', i=' + i);
      }
    }
  }
  console.log('SEED', mt.seed);
}
