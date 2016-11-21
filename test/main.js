var dsfmt = require('../');

var mt = dsfmt.create();

for (var i=0; i<20000; ++i) {
  var f = mt.next();
  i%100==0 && console.log(i, f);
}


console.log('SEED', mt.seed);
