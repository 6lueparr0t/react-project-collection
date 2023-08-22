import { useDispatch, useSelector } from "react-redux";

/**
 * 클래스 기반 사용 시
 */
// import { Component } from "react";
// import { connect } from "react-redux";

import classes from "./Counter.module.css";
import { counterActions } from "../store/counter";
// import { INCREMENT } from "../store/index";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector(state => state.counter.showCounter);

  const incrementHandler = (amount = 1) => (e) => {
    // dispatch({ type: "increase", amount : amount});
    dispatch(counterActions.increase(amount));
  };

  const decrementHandler = () => (e) => {
    // dispatch({ type: "decrement" });
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = (e) => {
    // dispatch({ type: 'toggle' });
    dispatch(counterActions.toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler()}>Increment</button>
        <button onClick={incrementHandler(5)}>Increment by 5</button>
        <button onClick={decrementHandler()}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

/**
 * 클래스 기반 사용법
 */
// class Counter extends Component {
//   incrementHandler() {
//     this.props.increment();
//   }
//   decrementHandler() {
//     this.props.decrement();
//   }
//   toggleCounterHandler() {}

//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler}>Increment</button>
//           <button onClick={this.decrementHandler}>Decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//       </main>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: "increment"}),
//     decrement: () => dispatch({ type: "decrement"})
//   }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);
