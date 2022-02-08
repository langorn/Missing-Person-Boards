const fs = require("fs");
const crypto = require('crypto')
const loader = require("@assemblyscript/loader");
const imports = {
   env: {
    abort(_msg, _file, line, column) {
      console.error("abort called at:" + line + ":" + column)
    },
    // For AssemblyScript, where the sample uses Math.random
    seed () {
      return Date.now()
    }


   }

};
//const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/out/main.wasm"), imports);
module.exports = wasmModule.exports;
/*
Object.defineProperty(module, "exports", {
  get: () => new WebAssembly.Instance(compiled, imports).exports
});
*/
