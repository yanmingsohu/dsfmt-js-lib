# 安全的随机数生成

[base on](https://github.com/MersenneTwister-Lab/dSFMT)

Mersenne Twister算法译为马特赛特旋转演算法，是伪随机数发生器之一，
其主要作用是生成伪随机数。此算法是Makoto Matsumoto （松本）和
Takuji Nishimura （西村）于1997年开发的，基于有限二进制字段上的
矩阵线性再生。可以快速产生高质量的伪随机数，修正了古老随机数产生算
法的很多缺陷。[算法原理](http://baike.baidu.com/view/2571145.htm)

need nodejs version >= 6


# install

`npm install dsfmt-js-lib --save`


# usage

```js
var dsfmt = require('dsfmt-js-lib');

// 使用自定义的种子
var seed = 1;
var mt = dsfmt.create(seed);

// 使用生成的安全种子
var mt = dsfmt.create();

// retern [0,1), 这两个函数功能相同
mt.next();
mt.random();
```
