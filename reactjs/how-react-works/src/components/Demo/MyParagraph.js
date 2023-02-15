import React from 'react';

const MyParagraph = (props) => {
  console.log("MyParagraph RUNNING");

  //부모 엘리먼트에서 사용된 값을 그대로 출력한다.
  return (<p>{props.children}</p>);
};

export default MyParagraph;
