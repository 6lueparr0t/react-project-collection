import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card";
import "../../style/Expenses/Expenses.scss";

const Expenses = (props) => {
  const expensesList = props.items.map((expenseItem, index) => {
    return (<ExpenseItem
      key={index}
      title={expenseItem.title}
      amount={expenseItem.amount}
      date={expenseItem.date}
    />)
  });
  return (
    <Card className="expenses">
    {expensesList}
    </Card>
  );
}
export default Expenses;