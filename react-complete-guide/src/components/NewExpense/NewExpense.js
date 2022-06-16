import React from 'react';
import ExpenseForm from './ExpenseForm';
import './NewExpense.scss';

const NewExpense = (props) => {
  const saveExpenseDataHandler = (entredExpenseData) => {
    const expenseData = {
      ...entredExpenseData,
      id: Math.random().toString()
    };

    // console.log(expenseData);
    props.onAddExpense(expenseData);
  }

  return <div className="new-expense">
    <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
  </div>
};

export default NewExpense;