import { useEffect, useState } from 'react';
import wasmModuleUrl from './my-module.wasm?url';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadWasmModule() {
      const response = await fetch(wasmModuleUrl);
      
      const buffer = await response.arrayBuffer();
      const module = await WebAssembly.instantiate(buffer);
      return module;
    }

    loadWasmModule().then((module) => {
      const result = module.instance.exports.add(1900 + 91);
      setMessage(result);
    });
  }, []);

  return <div>{message}</div>;
}

export default App;