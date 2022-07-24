import React, {useState} from 'react';

import AddIngredient from './components/Ingredients/AddIngredient';
import IngredientsList from './components/Ingredients/IngredientsList';

function App() {
  const [ingredientsList, setIngredientsList] = useState([]);

  const addIngredientHandler = (iName, iAmount) => {
    setIngredientsList((prevIngredientsList) => {
      return [...prevIngredientsList, {name: iName, amount: iAmount, id: Math.random().toString()}];
    });
  }

  const deleteIngredientHandler = (id) => {
    setIngredientsList(prevIngredientsList => {
      const updatedIngredients = prevIngredientsList.filter(ingredient => ingredient.id !== id);
      return updatedIngredients;
    });
  }

  return (
    <div>
      <AddIngredient onAddIngredient={addIngredientHandler} />
      <IngredientsList ingredients={ingredientsList} onDeleteIngredient={deleteIngredientHandler}/>
    </div>
  );
}

export default App;
