import './ExpenseDate.scss'

// 참고
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

const ExpenseDate = (props) => {
  const year = props.date.getFullYear();
  // const month = props.date.toLocaleString('ko-KR', {month: 'long'});
  const month = props.date.toLocaleString('en-US', {month: '2-digit'});
  // const month = props.date.getMonth()+1;
  // const day = props.date.toLocaleString('ko-KR', {day: '2-digit'});
  const day = props.date.toLocaleString('en-US', {day: '2-digit'});
  // const day = props.date.getDate();

  return (
    <div className="expense-date">
      <div className="expense-date__year">{year}년</div>
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  )
}

export default ExpenseDate;