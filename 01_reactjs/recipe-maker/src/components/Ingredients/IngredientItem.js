import React from "react";

const IngredientItem = (props) => {
  const deleteHandler = () => {
    props.onDeleteIngredient(props.id);
  };

  return (
    <li className="" onClick={deleteHandler}>
      {props.children}
    </li>
  );
}

export default IngredientItem;