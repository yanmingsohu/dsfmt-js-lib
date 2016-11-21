var dsfmt = require('../');
var arr = [];
var c = 100000;

// 测试 gc 回收内存需要修改 c 源码

console.log('gc')
for (var i=0; i<c; i++) {
  dsfmt.create()
}

console.log('not gc');
for (var i=0; i<c; i++) {
  arr.push( dsfmt.create() )
}

console.log('success.');
