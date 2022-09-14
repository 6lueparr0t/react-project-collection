import React, { useState, useCallback, useMemo } from "react";
import Button from "./components/UI/Button/Button";
import "./App.css";
import DemoOutput from "./components/Demo/DemoOutput";
import DemoList from "./components/Demo/DemoList";

function App() {
  const [show, setShow] = useState(false);
  const [allow, setAllow] = useState(false);
  const [title, setTitle] = useState('My List');

  console.log("APP RUNNING");

  const showHandler = useCallback(() => {
    if (allow) {
      setShow((prevShow) => !prevShow);
    }
  }, [allow]);

  const allowHandler = () => {
    setAllow((prevAllow) => !prevAllow);
  };

  const changeHandler = useCallback(() => {
    setTitle("New Title");
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <Button onClick={showHandler}>show</Button>
      <Button onClick={allowHandler}>allow</Button>
      <h1>Hi there!</h1>
      {/* <DemoOutput show={false} /> 동작 하지 말아야하는데 동작함.. */}
      {/* <DemoOutput /> 마찬가지 */}
      <DemoOutput show={show} />
      <DemoList title={title} items={listItems} />
      <Button onClick={changeHandler}>change</Button>
    </div>
  );
}

export default App;
