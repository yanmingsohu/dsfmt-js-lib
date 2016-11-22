{
  "targets": [
    {
      "target_name"	: "dsfmt_js_nv",
      "sources"		: [ "src/main.cc", "dSFMT-src-2.2.3/dSFMT.c" ],
      "include_dirs": [ 'dSFMT-src-2.2.3' ],
      'cflags'		: [ '-fexceptions' ],
      'cflags_cc'	: [ '-fexceptions' ],
      'defines'     : [ 'DSFMT_MEXP=19937' ]
    }
  ]
}
