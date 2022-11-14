import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Functions
import { login, signUp } from "./apiCalls";

// Styles
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(user, dispatch);
    } else {
      signUp(user, dispatch).then(() => {
        login(user, dispatch);
      });
    }
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Your Username</label>
          <input
            type="text"
            id="username"
            required
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
