import React, { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
// import Wrapper from "../Helper/Wrapper";
import classes from "./AddIngredient.module.scss";

const AddIngredient = (props) => {
  const [enteredIngrdientName, setEnteredIngrdientName] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [error, setError] = useState("");

  const addIngredientHandler = (event) => {
    event.preventDefault();
    if (
      enteredIngrdientName.trim().length === 0 ||
      enteredAmount.trim().length === 0
    ) {
      return setError({
        title: "재료가 비어있어요!",
        message: "재료를 넣어주세요. 얼만큼인지도요.",
      });
    }

    if (+enteredAmount < 1) {
      return setError({
        title: "너무 적어요ㅠ",
        message: "1 이상의 숫자만 넣어주세요!",
      });
    }

    if (+enteredAmount > 3) {
      return setError({
        title: "너무 많아요~ 🐷",
        message: "3 이하의 숫자만 넣어주세요~",
      });
    }

    props.onAddIngredient(enteredIngrdientName, enteredAmount);
    // console.log(enteredIngrdientName, enteredAmount);
    setEnteredIngrdientName("");
    setEnteredAmount("");
  };

  const ingredientChangeHandler = (event) => {
    setEnteredIngrdientName(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

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
            value={enteredIngrdientName}
            onChange={ingredientChangeHandler}
          />
          <label htmlFor="amount">
            얼만큼 넣을까요? 1:보통 / 2:조금 더 / 3:많이
          </label>
          <input
            id="amount"
            type="text"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
          <Button type="submit">재료 추가</Button>
        </form>
      </Card>
    </>
  );
};

export default AddIngredient;
