import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar({ token, setToken, userInfo, setUserInfo}) {
  const history = useHistory();

  return (
    <nav bg = "light" expand = "lg">
      <Container>
        <div className='d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start'>
        <Navbar.Brand className = "text-primary" href="/FrontPage">Luggage4All</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* <span
            className='navbar-text text-white'
            style={{ marginRight: '16px', fontSize: '30px' }}
          >
            <div className='site-icon'>
              
              <Link id='logo-script' className='nav-link px-2 text-white' style={{ fontFamily: "Brush Script MT", fontSize: '3rem'}} to='/'>
                Luggage4All
              </Link>{' '}
            </div>
          </span> */}

          <ul
            className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'
            style={{ fontSize: '24px' }}
          >
            <li>
              <Link className='nav-link px-2 text-primary' to='/products'>
                Shop
              </Link>
            </li>
          </ul>

          {token && (
            <span
              className='navbar-text text-primary'
              style={{ marginRight: '32px', fontSize: '24px' }}
            >
               {userInfo?.firstName}
            </span>
          )}

          {token && (
            <Link
              className='nav-link px-2 text-primary'
              to='/profile'
              style={{ marginRight: '32px', fontSize: '24px' }}
            >
              My Account
            </Link>
          )}

          {!token && (
            <div className='text-end '>
              <Link to='/login' className='navbar-links px-4 text-decoration-none'>
                Login
              </Link>
              <Link to='/register' className='navbar-links px-2  text-decoration-none font-weight-10'>
                Register
              </Link>
            </div>
          )}

          {/* <Link to='/orders/cart' className='navbar-links'>

          </Link> */}

          {token && (
            <div className='text-end'>
              <Button
                type='button'
                variant='danger'
                className='logout-button'
                onClick={(e) => {
                  localStorage.removeItem('jwt');
                  setToken(null);
                  setUserInfo(null);
                  history.push(`/`);
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>

      </Container>
    </nav>
  );
}

export default NavigationBar;