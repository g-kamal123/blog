import React, { useContext, useState } from "react";
import classes from "./Styles/LogIn.module.css";
import { Storage } from "./Storage";
import { useNavigate } from "react-router";
function Register() {
  const detail = useContext(Storage);
  const nav = useNavigate();
  const [rgsemail, setRgsEmail] = useState('');
  const [rgspass, setRgsPass] = useState('');
  return (
    <div className={classes.login}>
      <div>
        <img
          className={classes.image}
          src="https://media.istockphoto.com/photos/human-figure-icon-graphic-as-user-login-button-on-white-keyboard-picture-id1226883131?b=1&k=20&m=1226883131&s=170667a&w=0&h=FMYb1DFOYbcb2vmbzZhq71k-4cuarJ1U4xCBWjGnze8="
          alt=""
        />
      </div>
      <div className={classes.content}>
        <p>
          <h2>Create Account</h2>{" "}
          <button onClick={() => nav("/login")}>Login</button>
        </p>
        <form className={classes.form} onSubmit={detail.aboutUser}>
          <label>Email:</label>
          <input onChange={(event) => setRgsEmail(event.target.value)} />
          <label type="password">Password:</label>
          <input
            type="password"
            onChange={(event) => setRgsEmail(event.target.value)}
          />
          <label type="password">Confirm Password:</label>
          <input
            type="password"
            onChange={(event) => setRgsEmail(event.target.value)}
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
