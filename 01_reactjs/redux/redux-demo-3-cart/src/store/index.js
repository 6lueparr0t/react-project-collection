/**
 * src/index 에서 호출
 */
// import { legacy_createStore as createStore} from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import cartSlice from "./cart-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer : {ui: uiSlice.reducer, cart: cartSlice.reducer},
});

export default store;