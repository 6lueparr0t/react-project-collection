import React, { useState } from "react";

import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "./Expenses.scss";
import ExpensesFilter from "./ExpenseFilter";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState(new Date().getFullYear());

  const filterChangeHandler = selectedYear => {
    // console.log("Expenses.js");
    // console.log(selectedYear);
    setFilteredYear(selectedYear)
  };
  const expensesList = props.items.map((expenseItem, index) => {
    return (
      <div key={index}>
        <Card>
          <ExpensesFilter
            selected={filteredYear}
            onFilterExpenseData={filterChangeHandler}
          />
          <ExpenseItem
            key={index}
            title={expenseItem.title}
            amount={expenseItem.amount}
            date={expenseItem.date}
          />
        </Card>
      </div>
    );
  });
  return <Card className="expenses">{expensesList}</Card>;
};
export default Expenses;
