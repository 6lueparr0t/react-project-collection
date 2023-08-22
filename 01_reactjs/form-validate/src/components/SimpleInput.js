import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset : resetNameInput,
  } = useInput(value => value.trim() !== '');
  // const [enteredName, setEnteredName] = useState("");
  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset : resetEmailInput,
  } = useInput(value => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g;
    return value.match(regex);
  });
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false); // 초기 값을 true 주지말고 false 로 처리할 것

  // const enteredNameIsValid = enteredName.trim() !== ''; // useState 를 const 로 만드는 것 만으로도 코드를 줄일 수 있다.
  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched; // 초기 !enteredNameIsValid : True, enteredNameTouched : False

  // 정규식 표현 사용
  // const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g;
  // const enteredEmailIsValid = enteredEmail.match(regex);
  // const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  // const nameInputChangeHandler = (event) => {
  //   setEnteredName(event.target.value);
  // };

  // const nameInputBlurHandler = (event) => {
  //   setEnteredNameTouched(true);
  // };

  // const emailInputChangeHandler = (event) => {
  //   setEnteredEmail(event.target.value);
  // };

  // const emailInputBlurHandler = (event) => {
  //   setEnteredEmailTouched(true);
  // };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    // setEnteredNameTouched(true);
    // setEnteredEmailTouched(true);

    if (!enteredNameIsValid)  {
      return false;
    }

    if (!enteredEmailIsValid)  {
      return false;
    }

    console.log(enteredName);
    console.log(enteredEmail);

    // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
    // setEnteredName("");
    // setEnteredNameTouched(false);
    resetNameInput();

    // setEnteredEmail("");
    // setEnteredEmailTouched(false);
    resetEmailInput();
  };
  
  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className="error-text">Email must not be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
