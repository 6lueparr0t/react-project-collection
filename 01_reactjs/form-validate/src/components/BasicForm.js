import useInput from "../hooks/use-input";

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g;
  return value.match(regex);
}

const BasicForm = (props) => {
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset : resetFirstName,
  } = useInput(isNotEmpty);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset : resetLastName,
  } = useInput(value => value.trim() !== '');

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
    reset : resetEmail,
  } = useInput(isEmail);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
    console.log(formIsValid);
  }

  const submitHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return ;
    }

    console.log("Submitted!")
    console.log(firstName, lastName, email);

    resetFirstName();
    resetLastName();
    resetEmail();
  }
  const firstNameClasses = firstNameHasError ? 'form-control invalid' : 'form-control';
  const lastNameClasses = lastNameHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={submitHandler}>
      <div className={firstNameClasses}>
        <div className='form-control'>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name'
            onChange={firstNameChangedHandler}
            onBlur={firstNameBlurHandler}
            value={firstName}
          />
          {firstNameHasError && <p className="error-text">Please enter a first name.</p>}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name'
          onChange={lastNameChangedHandler}
          onBlur={lastNameBlurHandler}
          value={lastName}
          />
          {lastNameHasError && <p className="error-text">Please enter a last name.</p>}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='text' id='name'
        onChange={emailChangedHandler}
        onBlur={emailBlurHandler}
        value={email}
        />
        {emailHasError && <p className="error-text">Please enter a valid email address.</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
