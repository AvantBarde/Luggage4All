import React, { useState } from "react";
import { registerUser } from "../API";
import { Link, useHistory} from "react-router-dom";
import '../style/Register.css'
//firstName, lastName, email, imageURL, username, password, isAdmin
const Register = ({setRetainUserName}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [usernameString, setUsernameString] = useState("");
  const [passwordString, setPasswordString] = useState("");
  const [confirmPasswordString, setConfirmPasswordString] = useState("");
  const [registered, setRegistered] = useState("")

  const history = useHistory();

  return (
    <div className='registerContainer'>
      {registered ? <h2>{registered}</h2> : <h2>Register an account!</h2>}
      <form
        id="register"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (passwordString === confirmPasswordString) {
              await registerUser(firstName, lastName, email, usernameString, passwordString).then((results) => {
                if (results.message === 'Thank you for registering') {
                  setRegistered(`${results.user.username} successfully registered, proceed to login.`)
                  setRetainUserName(usernameString)
                  history.push('./login');
                } else {
                  setRegistered(results.message)
                }
              });
            } else {
              setRegistered('Passwords must match.')
            }
          } catch (error) {
            console.error(error.message);
          }
        }}
      >
        <fieldset className='usersName'>
          <input
            id="first-name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={async (e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            id="last-name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={async (e) => {
              setLastName(e.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={usernameString}
            onChange={async (e) => {
              setUsernameString(e.target.value);
            }}
          />
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={async (e) => {
              setEmail(e.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <input
            id="password"
            type="password"
            placeholder="Password"
            minLength={8}
            value={passwordString}
            onChange={async (e) => {
              setPasswordString(e.target.value);
            }}
          />
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            minLength={8}
            value={confirmPasswordString}
            onChange={async (e) => {
              setConfirmPasswordString(e.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <button type="submit">Register Account</button>
        </fieldset>
        <span>Already have an account? <Link to="/account/login"> Login here!</Link></span>
      </form>

    </div>
  );
};

export default Register;
