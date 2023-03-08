import { useEffect, useState } from 'react';
import wasmModuleUrl from './my-module.wasm?url';

function App() {
  const [message, setMessage] = useState("");

  let initialized = false;

  useEffect(() => {
    if (initialized) return () => {};
    initialized = true;

    async function loadWasmModule() {
      const response = await fetch(wasmModuleUrl);
      const buffer = await response.arrayBuffer();
      const importObject = {
        env: {
          abort: () => console.log("Abort!")
        }
      };

      const module = await WebAssembly.instantiate(buffer, importObject);
      return module;
    }

    loadWasmModule().then((module) => {
      const exports = module.instance.exports;

      console.log(exports.staticOne());
      console.log(exports.staticAdd(1, 2));
      console.log(exports.instanceTwo());
      console.log(exports.instanceSub(3.0, 1.0));

      setMessage(exports.staticOne());
    });

    return () => {};
  }, []);

  return <div>Hello, World! {message}</div>;
}

export default App;