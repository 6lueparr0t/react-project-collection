import React from 'react';
import MyParagraph from './MyParagraph';

const DemoOutput = (props) => {
  console.log("DemoOutput RUNNING");

  return (<MyParagraph>{props.show ? 'this is new!':''}</MyParagraph>);
};

//React.memo 는 이전 값과 비교를 해서, 변경이 일어났을 때만 실행이 된다.
export default React.memo(DemoOutput);
