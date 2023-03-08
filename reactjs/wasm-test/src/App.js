import { useEffect, useState } from 'react';
import wasmModuleUrl from './assembly/module.wasm?url';

function App() {
  const [message, setMessage] = useState("");

  let initialized = false;

  const getString = (memory, ptr) => {
    // Get the length of the string from memory
    const length = new Uint16Array(memory.buffer)[ptr/8];

    // Get the character codes from memory
    const codes = new Uint16Array(memory.buffer).subarray((ptr / 2), (ptr / 2) + length);
  
    // Convert the character codes to a string
    return String.fromCharCode(...codes);
    // // Decode them as UTF-8 and return the string
    // return new TextDecoder("utf-8").decode(bytes);
  }

  useEffect(() => {
    if (initialized) return () => {};
    initialized = true;

    async function loadWasmModule() {
      const response = await fetch(wasmModuleUrl);
      const buffer = await WebAssembly.compile(await response.arrayBuffer());
      const importObject = {
        env: {
          abort: () => console.log("Abort!"),
          // memory: new WebAssembly.Memory({ initial: 1024 }),
        }
      };

      const module = await WebAssembly.instantiate(buffer, importObject);
      return module;
    }

    loadWasmModule().then((module) => {
      const wasm = module.exports;

      console.log(wasm.staticOne());
      console.log(wasm.staticAdd(1, 2));
      console.log(wasm.instanceTwo());
      console.log(wasm.instanceSub(3.0, 1.0));

      const helloWorld = getString(wasm.memory, wasm.helloWorld());
      setMessage(helloWorld);
    });

    return () => {};
  }, []);

  return <h1>{message}</h1>;
}

export default App;