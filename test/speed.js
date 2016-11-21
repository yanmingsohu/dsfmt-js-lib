var dsfmt = require('../');

var mt = dsfmt.create();
var count = 10000000;


console.log('Begin, loop', count);
for (var i=0; i<3; ++i) {
  speed(node);
  speed(sfmt1);
  speed(sfmtarr);
}


function node() {
  for (var i=0; i<count; ++i) {
    Math.random();
  }
}


function sfmtarr() {
  for (var i=0; i<count; ++i) {
    mt.next();
  }
}


function sfmt1() {
  for (var i=0; i<count; ++i) {
    mt.next1();
  }
}


function speed(fn) {
  var begin = Date.now();
  fn();
  var use = Date.now()-begin;
  console.log(fn.name, 'Use', use, 'ms,\t', parseInt(count/use), 'count/ms');
}

/*
Begin, loop 10000000,
node    Use   69 ms,     144927 count/ms  系统自带随机数
sfmt1   Use 1217 ms,       8216 count/ms  单独调用时的性能
sfmtarr Use  251 ms,      39840 count/ms  正式函数的性能
node    Use   66 ms,     151515 count/ms
sfmt1   Use 1220 ms,       8196 count/ms
sfmtarr Use  250 ms,      40000 count/ms
node    Use   66 ms,     151515 count/ms
sfmt1   Use 1213 ms,       8244 count/ms
sfmtarr Use  245 ms,      40816 count/ms
*/
