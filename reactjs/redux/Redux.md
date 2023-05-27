# Redux 정리

## Structure

- src/store
  - index.js : 각각의 store 를 호출하고, 설정하는 곳
  - *-slice.js : 각각 다른 store 를 의미함
    - ex) cart-slice.js : 장바구니
    - ex) ui-slice.js : UI 컴포넌트 토글 기능 등등

## Setting

src/index.js
```javascript
import store from './store/index';

// 전역에 store 제공
root.render(<Provider store={store}><App /></Provider>);
```

src/store/index.js
```javascript
// store 설정 (setting)
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
```

src/store/cart-slice.js
```javascript
// slice 생성 (create)
import { createSlice } from "@reduxjs/toolkit";

// 초기 값
const initialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      state.totalQuantity++;
      ...
      ...
      ...
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      state.totalQuantity--;
      ...
      ...
      ...
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;

```

## Use

```javascript
// store 값을 조작할 때 (update, delete)
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
...

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, price, description } = props;

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart({ id, title, price, description }));
  };
  ...
  ...
  ...
};

// store 값을 가져올 때 (read)
import { useSelector } from "react-redux";
...

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  ...
  ...
};
```