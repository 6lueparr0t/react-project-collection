import React from "react";

import IngredientItem from "./IngredientItem";
import Card from "../UI/Card";
import classes from "./IngredientsList.module.scss";

const IngredientsList = (props) => {
  return (
    <Card className={classes.ingredients}>
      <ul>
        {props.ingredients.map((ingredient, i) => (
          <IngredientItem
            key={i}
            id={ingredient.id}
            onDeleteIngredient={props.onDeleteIngredient}
          >
            {ingredient.name} {ingredient.amount}
          </IngredientItem>
        ))}
      </ul>
    </Card>
  );
};

export default IngredientsList;
