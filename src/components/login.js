import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { tokenLogin, callApi } from '../axios-services/index';

export default function Login({setToken,}) {
    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const loginInfo = {
          username: username,
          password: password,
        };
        const results = await callApi({
          url: "/api/users/login",
          method: "POST",
          body: loginInfo,
        });
        if (results){
            console.log(results);
        }
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const productsPage = ()=>{
      history.push('/products')
    }

    return (
<section className="vh-50" style={{backgroundColor:""}}>
  <div className="container py-5 h-50">
    <div className="row d-flex justify-content-center align-items-center h-50">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: "1rem"}}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img src={require('./img/pexels-leticia-ribeiro-2112638.jpg')}
                alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">

                <form
                onSubmit={handleSubmitLogin}>
                    

                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                  </div>

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <input type="text" id="username" className="form-control form-control-lg" value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
                    <label className="form-label" htmlFor="username">Username</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="password" className="form-control form-control-lg" minLength="7" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    <label className="form-label" htmlFor="password">Password</label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                  </div>
                  <p>Don't have an account? <a href="#!" className="link-info"><Link to="/register">Register here</Link></a></p>
                  
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    )
}