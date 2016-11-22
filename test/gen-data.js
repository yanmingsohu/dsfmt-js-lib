var dsfmt = require('../');


var out = { DSFMT_MEXP: dsfmt.DSFMT_MEXP };
gen(0);
gen(1);
gen(2);
gen(3);
gen(1009);
require('fs').writeFileSync(__dirname + '/test-data.json', JSON.stringify(out, 0, 2));
console.log('DSFMT_MEXP', dsfmt.DSFMT_MEXP);

function gen(seed) {
  var o = out[seed] = {};
  var mt = dsfmt.create(seed);
  for (var i=0; i<20000; ++i) {
    var f = mt.next();
    if (i%100 == 0 || i<20) {
      console.log(i, f);
      o[i] = f;
    }
  }
  o.seed = mt.seed;
  console.log('SEED', mt.seed);
}
