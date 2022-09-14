import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  console.log("Button RUNNING")
  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

// 하지만 객체, 배열, 함수의 경우엔 참조값이 고유하기 때문에 이전 값과 항상 다르다.
// 따라서 이 경우에는 정상 동작 하지 않는다.
export default React.memo(Button);
