
module.exports = function(native) {
  return {
    DSFMT_MEXP : native.DSFMT_MEXP,

    gen_seed: function() {
      var htr = process.hrtime();
      var mem = process.memoryUsage();

      seed = Date.now() + (htr[0] << 4) + htr[1]
           + (process.pid * 10000000000)
           + (mem.rss + mem.heapTotal + mem.heapUsed)
           + (process.uptime() * 100000000000)
           + (Math.random() * 100000000000000);

      for (var i=0; i<20; ++i) {
        var b = parseInt(new Buffer(6).toString('hex'), 16);
        if (i%2==0) {
          seed ^= b;
        } else {
          seed += b;
        }
      }

      if (seed < 0) seed = 0 - seed;

      return parseInt(seed);
    },

    create: function(seed) {
      if (isNaN(seed)) {
        seed = this.gen_seed();
      }
      var gen = native.create(seed);
      return warp_nv(gen, seed);
    },
  };

  function warp_nv(gen, seed) {
    var pos = -1;
    var arr = null;

    return {
      next1   : gen.next1, // 这个函数仅用于测试, 它的性能低于 next
      seed    : seed,
      next    : random,
      random  : random,
    };

    function random() {
      if (arr == null || ++pos >= arr.length) {
        arr = gen.nexta();
        pos = 0;
      }
      return arr[pos];
    }
  }

};
