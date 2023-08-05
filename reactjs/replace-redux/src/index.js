import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
// import ProductsProvider from "./context/products-context";
import configureProductStore from './hooks-store/products-store';

configureProductStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <ProductsProvider>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </ProductsProvider>
// );
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
