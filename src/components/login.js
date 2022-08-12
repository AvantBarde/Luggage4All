import React, { useState } from "react";
import { loginUser } from "../API";
import '../style/Login.css'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

const Login = ({ setToken, setUser, retainUserName }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [heading, setHeading] = useState('')
  return (
    <div className='loginContainer'>
      {!heading ? <h2>Please Login!</h2> : <h2>{heading}</h2>}
      <form
        id="login"
        onSubmit={async (event) => {
          event.preventDefault();
          console.log(username, password)
          try {
            await loginUser({ username, password }).then((results) => {
              console.log(results)
              if (results.token !== undefined) {
                setToken(results.token);
                localStorage.setItem("jwt", results.token);
              }
              if (results.user !== undefined) {
                setUser(results.user)
                localStorage.setItem('userObject', JSON.stringify(results.user))
              }
              if (results.message === 'Username & Password combination is incorrect.') {
                setHeading(results.message)
              }
            });
          } catch (error) {
            console.error(error.message);
          }
        }}
      >

        <fieldset>
          <input
            id="username-login"
            type="text"
            placeholder={retainUserName ? `Please login, ${retainUserName}` : "Username"}
            value={retainUserName ? retainUserName : username}
            onChange={async (e) => {
              setUsername(e.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <input
            id="password-login"
            type="password"
            placeholder="Password"
            value={password}
            onChange={async (e) => {
              setPassword(e.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <button type="submit">Login</button>
        </fieldset>
        <span> Don't have an account? <Link to="/account/register"> Register here!</Link></span>
      </form>
    </div>
  );
};

export default Login;
