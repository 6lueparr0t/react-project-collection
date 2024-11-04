import { useEffect, useState, useRef } from 'react';
import wasmModuleUrl from './assembly/module.wasm';

function App() {
  const [message, setMessage] = useState("");

  const initialized = useRef(false);

  const getString = (memory, ptr) => {
    // Get the length of the string from memory
    const length = new Uint16Array(memory.buffer)[ptr / 8];

    // Get the character codes from memory
    const codes = new Uint16Array(memory.buffer).subarray((ptr / 2), (ptr / 2) + length);

    // Convert the character codes to a string
    return String.fromCharCode(...codes);
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    async function loadWasmModule() {
      const response = await fetch(wasmModuleUrl);
      const buffer = await response.arrayBuffer();
      const module = await WebAssembly.instantiate(buffer, {
        env: {
          abort: () => console.log("Abort!"),
        }
      });

      return module.instance.exports;
    }

    loadWasmModule().then((wasm) => {
      console.log(wasm.staticOne());
      console.log(wasm.staticAdd(1, 2));
      console.log(wasm.instanceTwo());
      console.log(wasm.instanceSub(3.0, 1.0));

      const helloWorld = getString(wasm.memory, wasm.helloWorld());
      setMessage(helloWorld);
    });
  }, []);

  return <h1>{message}</h1>;
}

export default App;