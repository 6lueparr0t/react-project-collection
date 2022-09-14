import React, { useState } from "react";

import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";
import "./Expenses.scss";

const today = new Date().toISOString().substring(0, 10);
const ExpensesToday = (props) => {
  const [filteredToday, setFilteredToday] = useState(today);

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.toISOString().substring(0, 10) === filteredToday;
  });

  return (
    <>
      <Card className="expenses">
        <div className='expenses__control'>
          <label>Today Expenses ({today})</label>
        </div>
        <ExpensesList items={filteredExpenses} />
      </Card>
    </>
  );
};
export default ExpensesToday;
