import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { tokenRegister, callApi } from '../axios-services/index';

export default function Register(props) {
  const { setToken } = props;

  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const history = useHistory();

  const productsPage = () => {
    history.push('/products');
  };

  return (
    <section className='vh-50' style={{ backgroundColor: '' }}>
      <div className='container py-5 h-50'>
        <div className='row d-flex justify-content-center align-items-center h-50'>
          <div className='col col-xl-10'>
            <div className='card' style={{ borderRadius: '1rem' }}>
              <div className='row g-0'>
                <div className='col-md-6 col-lg-5 d-none d-md-block'>
                <img src={require('./img/pexels-leticia-ribeiro-2112638.jpg')}
                    alt='login form'
                    className='img-fluid'
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className='col-md-6 col-lg-7 d-flex align-items-center'>
                  <div className='card-body p-4 p-lg-3 text-black'>
                    <form
                      onSubmit={async (e) => {
                        try{
                        e.preventDefault();
                        const loginInfo = {
                            username: userName,
                            password: password,
                            firstname: firstName,
                            lastname: lastName,
                            email: email,
                          };
                        if (password === confirmPassword) {
                            const results = await callApi({
                                url: "/api/users/register",
                                method: "POST",
                                body: loginInfo,
                              });
                              console.log(results);
                              setPassword("");
                              setConfirmPassword("");
                              if (results.token) {
                                localStorage.removeItem("token");
                                localStorage.setItem("token", results.token);
                                setUsername("");
                                setTimeout(function () {
                                  history.push("/products");
                                }, 3000);
                              }
                      }}catch(error){
                        console.log('Error happened here!')
                        console.error(error);
                    }}}
                    >
                      <div className='d-flex align-items-center mb-3 pb-1'>
                        <i
                          className='fas fa-cubes fa-2x me-3'
                          style={{ color: '#ff6219' }}
                        ></i>
                      </div>

                      <h5
                        className='fw-normal mb-3 pb-3'
                        style={{ letterSpacing: '1px' }}
                      >
                        Register a new account
                      </h5>

                      <div className='form-outline mb-4'>
                        <input
                          type='text'
                          id='username'
                          className='form-control form-control-md'
                          value={userName}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          required
                        />
                        <label className='form-label' htmlFor='username'>
                          Username
                        </label>
                      </div>
                      <div className='form-outline mb-4 row d-flex justify-content-between'>
                        <div className='col-5'>
                          <input
                            type='text'
                            id='firstName'
                            className='form-control form-control-md col-5'
                            value={firstName}
                            onChange={(e) => {
                              setFirstName(e.target.value);
                            }}
                            required
                          />
                          <label className='form-label' htmlFor='firstName'>
                            First Name
                          </label>
                        </div>

                        <div className='col-5'>
                          <input
                            type='text'
                            id='lastName'
                            className='form-control form-control-md col-5'
                            value={lastName}
                            onChange={(e) => {
                              setLastName(e.target.value);
                            }}
                            required
                          />
                          <label className='form-label' htmlFor='lastName'>
                            Last Name
                          </label>
                        </div>
                      </div>

                      <div className='form-outline mb-4'>
                        <input
                          type='email'
                          id='email'
                          className='form-control form-control-md'
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          required
                        />
                        <label className='form-label' htmlFor='email'>
                          Email Address
                        </label>
                      </div>

                      <div className='form-outline mb-4'>
                        <input
                          type='password'
                          id='password'
                          className='form-control form-control-md'
                          minLength='7'
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          required
                        />
                        <label className='form-label' htmlFor='password'>
                          Password
                        </label>
                      </div>

                      <div className='form-outline mb-4'>
                        <input
                          type='password'
                          id='confirmPassword'
                          className='form-control form-control-md'
                          minLength='7'
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                          }}
                          required
                        />
                        <label className='form-label' htmlFor='confirmPassword'>
                          Confirm password
                        </label>
                      </div>

                      <div className='row d-flex align-items-center'>
                        <div className='pt-1 mb-4 col-4'>
                          <button
                            className='btn btn-dark btn-md btn-block'
                            type='submit'
                          >
                            Register
                          </button>
                        </div>
                        <p className='col col-8'>
                          Already have an account?{' '}
                          <a href='#!' className='link-info'>
                            <Link to='/login'>Login here</Link>
                          </a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}