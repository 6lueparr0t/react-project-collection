import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
// import Wrapper from "../Helper/Wrapper";
import classes from "./AddIngredient.module.scss";

const AddIngredient = (props) => {
  const ingredientInputRef = useRef();
  const amountInputRef = useRef();

  // 이제 useRef 로 관리한다.
  // useRef 를 사용하면 제어되지 않는 컴포넌트가 된다. 반면 useState 를 사용한 방식은 제어된 컴포넌트 다.
  // const [enteredIngredientName, setEnteredIngrdientName] = useState("");
  // const [enteredAmount, setEnteredAmount] = useState("");
  const [error, setError] = useState("");

  const addIngredientHandler = (event) => {
    event.preventDefault();
    // console.log(ingredientInputRef.current.value, amountInputRef.current.value);

    const enteredIngredientNameRef = ingredientInputRef.current.value;
    const enteredAmountRef = amountInputRef.current.value;

    if (
      enteredIngredientNameRef.trim().length === 0 ||
      enteredAmountRef.trim().length === 0
    ) {
      return setError({
        title: "재료가 비어있어요!",
        message: "재료를 넣어주세요. 얼만큼인지도요.",
      });
    }

    if (+enteredAmountRef < 1) {
      return setError({
        title: "너무 적어요ㅠ",
        message: "1 이상의 숫자만 넣어주세요!",
      });
    }

    if (+enteredAmountRef > 3) {
      return setError({
        title: "너무 많아요~ 🐷",
        message: "3 이하의 숫자만 넣어주세요~",
      });
    }

    props.onAddIngredient(enteredIngredientNameRef, enteredAmountRef);
    ingredientInputRef.current.value = "";
    amountInputRef.current.value = "";

    // props.onAddIngredient(enteredIngredientName, enteredAmount);
    // console.log(enteredIngredientName, enteredAmount);
    // setEnteredIngrdientName("");
    // setEnteredAmount("");
  };

  // const ingredientChangeHandler = (event) => {
  //   setEnteredIngrdientName(event.target.value);
  // };

  // const amountChangeHandler = (event) => {
  //   setEnteredAmount(event.target.value);
  // };

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addIngredientHandler}>
          <label htmlFor="ingredient">재료</label>
          <input
            id="ingredient"
            type="text"
            // value={enteredIngredientName}
            // onChange={ingredientChangeHandler}
            ref={ingredientInputRef}
          />
          <label htmlFor="amount">
            얼만큼 넣을까요? 1:보통 / 2:조금 더 / 3:많이
          </label>
          <input
            id="amount"
            type="text"
            // value={enteredAmount}
            // onChange={amountChangeHandler}
            ref={amountInputRef}
          />
          <Button type="submit">재료 추가</Button>
        </form>
      </Card>
    </>
  );
};

export default AddIngredient;
