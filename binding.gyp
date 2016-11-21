{
  "targets": [
    {
      "target_name"	: "dsfmt_js_nv",
      "sources"		: [ "src/main.cc", "dSFMT-src-2.2.3/dSFMT.c" ],
      "include_dirs": [ ],
      'cflags'		: ['-fexceptions', '-DDSFMT_MEXP=216091'],
      'cflags_cc'	: ['-fexceptions',  '-DDSFMT_MEXP=216091'],
    }
  ]
}
