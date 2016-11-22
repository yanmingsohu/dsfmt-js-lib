#ifndef MAIN_H_INC
#define MAIN_H_INC

#include <node.h>
#include <v8.h>
#include <uv.h>
#include <iostream>
#include <sstream>
#include <string>
#include <set>

using namespace v8;
using namespace node;
using namespace std;

template <typename TypeName>
inline void set_method( Isolate* isolate,
                        TypeName& recv,
                        char* name,
                        FunctionCallback callback,
                        void *data = 0) {
  HandleScope handle_scope(isolate);
  Local<External> fdata = External::New(isolate, data);
  Local<FunctionTemplate> t = FunctionTemplate::New(isolate, callback, fdata);
  Local<Function> fn = t->GetFunction();
  Local<String> fn_name = String::NewFromUtf8(isolate, name);
  fn->SetName(fn_name);
  recv->Set(fn_name, fn);
}


template <typename TypeName>
inline void set_attribute(TypeName& obj, char* name, long number) {
  Isolate *iso = Isolate::GetCurrent();
  HandleScope scope(iso);
  obj->Set(
    String::NewFromUtf8(iso, name),
    Number::New(iso, number) );
}


#endif // MAIN_H_INC
