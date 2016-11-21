#include <node.h>
#include <v8.h>
#include <v8-debug.h>
#include <uv.h>
#include <iostream>
#include <set>
#include <sstream>
#include "../dSFMT-src-2.2.3/dSFMT.h"

using namespace v8;
using namespace node;
using namespace std;


struct MtData {
  dsfmt_t mt;
  Persistent<Object> obj;
  MtData(Isolate *iso, Local<Object> &l) : obj(iso, l) {}
};


// 一个数据单独返回, 效率低
void j_next(const FunctionCallbackInfo<Value> &args) {
  Isolate *iso = args.GetIsolate();
  HandleScope scope(iso);
  Local<External> tmp = args.Data().As<External>();
  dsfmt_t* fmt = (dsfmt_t*) tmp->Value();
  double ran = dsfmt_genrand_close_open(fmt);
  args.GetReturnValue().Set(ran);
}


// 一组数据一起返回, 且使用缓冲区复制
void j_next_arr(const FunctionCallbackInfo<Value> &args) {
  Isolate *iso = args.GetIsolate();
  HandleScope scope(iso);
  Local<Context> context = iso->GetCurrentContext();
  Local<External> tmp = args.Data().As<External>();
  dsfmt_t* fmt = (dsfmt_t*) tmp->Value();

  // 提升 size 1倍, 性能提升大约 2%, 增大 size 好处不大
  const int size = DSFMT_N64;
  double *arr = new double[size];
  dsfmt_fill_array_close_open(fmt, arr, size);

  // kInternalized: 由 nodejs 来管理 arr 的内存释放
  Local<ArrayBuffer> ab = ArrayBuffer::New(iso, arr,
      size * sizeof(double), ArrayBufferCreationMode::kInternalized);
  Local<Float64Array> fa = Float64Array::New(ab, 0, size);
  args.GetReturnValue().Set(fa);
}


void wc_free_dsfmt_t(const WeakCallbackData<Object, MtData> &data) {
  MtData* mt = data.GetParameter();
  mt->obj.Reset();
  delete mt;
}


//
// 第一个参数必须设置
// args[0] = Number
//
void j_create(const FunctionCallbackInfo<Value>& args) {
  Isolate *iso = args.GetIsolate();
  HandleScope scope(iso);
  uint32_t seed = args[0]->ToUint32()->Value();

  Local<Object> ret = Object::New(iso);
  MtData *mtdata = new MtData(iso, ret);
  set_method(iso, ret, "next1", j_next, &mtdata->mt);
  set_method(iso, ret, "nexta", j_next_arr, &mtdata->mt);
  mtdata->obj.SetWeak(mtdata, wc_free_dsfmt_t);

  dsfmt_init_gen_rand(&mtdata->mt, seed);

  args.GetReturnValue().Set(mtdata->obj);
}


void j_version(const FunctionCallbackInfo<Value>& args) {
  Isolate *iso = args.GetIsolate();
  HandleScope scope(iso);
  Local<String> ver = String::NewFromUtf8(iso, v8::V8::GetVersion());
  args.GetReturnValue().Set(ver);
}


void init(Handle<Object> exports) {
  void hook_error();
  hook_error();
  NODE_SET_METHOD(exports, "v8version", j_version);
  NODE_SET_METHOD(exports, "create", j_create);
}

NODE_MODULE(dsfmt_js_nv, init)
