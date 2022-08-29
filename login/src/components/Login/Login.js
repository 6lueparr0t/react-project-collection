import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

// useReducer 를 사용하는 경우
// useState 로 많은 일들을 할 때, 자주 변경할 때 useReducer 를 사용한다.
// useState 에서 처리하기 복잡한 코드들을 단순화 할 때
// 연관된 useState 를 사용할 때
// state : 최신 값  / action : 입력받은 값
const emailReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.value, isValid: action.value.includes("@") };
    case "INPUT_BLUR":
      return { value: state.value, isValid: state.value.includes("@") };
    default:
      break;
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  switch (action.type) {
    case "USER_INPUT":
      console.log({ value: action.value, isValid: action.value.trim().length > 6 });
      return { value: action.value, isValid: action.value.trim().length > 6 };
    case "INPUT_BLUR":
      console.log({ value: state.value, isValid: state.value.trim().length > 6 });
      return { value: state.value, isValid: state.value.trim().length > 6 };
    default:
      break;
  }

  console.log({ value: "", isValid: false });
  return { value: "", isValid: false };
};

const Login = (props) => {
  // emailReducer 를 사용한다.
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  // passwordReducer 를 사용한다.
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // enteredPassword 가 변경될 경우에만 실행된다.
  // enteredPassword 에 의존성을 갖는다.
  // 그렇지 않으면 모든 컴포넌트가 렌더링 주기 후에 실행된다.
  // useEffect(() => {
  //   console.log('EFFECT RUNNING');
  //
  // useEffect 가 실행되고 마지막에 실행된다.
  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, [enteredPassword]);

  // Object Destructuring
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
    setFormIsValid(emailState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", value: event.target.value });
    setFormIsValid(passwordState.isValid);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes("@"));
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // validation 체크, 실패 시 해당 Input 으로 Focus
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
