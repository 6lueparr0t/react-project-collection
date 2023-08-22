import { legacy_createStore as createStore} from 'redux'

const initialState = { counter: 0, showCounter: true };

// 상수 선언으로 오타로 인한 버그를 방지함
// export const INCREMENT = "increment";

const counterReducer = (state = initialState, action) => {
  // state 를 직접 조작하지 말고 항상 복사해서 값을 변경 시킬 것
  // 기존의 객체에 영향을 주기 때문에, 의도치 않은 버그를 발생시킴
  if (action.type === "increment") {
    return {
      counter : state.counter + 1,
      showCounter : state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter : state.counter + action.amount,
      showCounter : state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter : state.counter - 1,
      showCounter : state.showCounter,
    };
  }

  if (action.type === "decrease") {
    return {
      counter : state.counter - action.amount,
      showCounter : state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      counter : state.counter,
      showCounter : !state.showCounter,
    };
  }

  return state;
}

const store = createStore(counterReducer);

export default store;