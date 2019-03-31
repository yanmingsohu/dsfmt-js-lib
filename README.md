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

// 编译 dSFMT 时使用的参数
dsfmt.DSFMT_MEXP;

// 使用自定义的种子
var seed = 1;
var mt = dsfmt.create(seed);

// 使用生成的安全种子
var mt = dsfmt.create();

// retern [0,1), 这两个函数功能相同
mt.next();
mt.random();
```


# DSFMT_MEXP

生成随机数会重复的次数=2^DSFMT_MEXP, 如果 DSFMT_MEXP=512, 大概的重复周期为
(13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084096)
默认编译参数 DSFMT_MEXP=19937 足够生成不重复的随机数.

改变 DSFMT_MEXP 的方法:
修改 binding.gyp 中 targets.defines.DSFMT_MEXP 并重新编译. 运行测试程序查看输出.

可选的 DSFMT_MEXP:
521, 1279, 2203, 4253, 11213, 19937, 44497, 86243, 132049, 216091


# 自动生成的种子

在创建 dsfmt 对象时没有指定种子参数, 则会自动生成一个种子, 这个种子与进程id, 时间,
内存状态等相关, 足够复杂而难以预测, 推荐使用自动生成的种子.
