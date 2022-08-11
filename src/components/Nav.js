import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import '../style/Nav.css'

const Navbar = ({ token, setToken, setUser }) => {

  const logOut = () => {
    return (
      <button id = "logout" onClick={() => {
        setToken('')
        setUser({})
        localStorage.clear()
        // need to redirect to login page.
      }}>Log out</button>
    )
   }

  return (
    <nav id="navbar">
      <ul className='linksList'>
        <li>
        <Link to="/products">Products</Link>
        </li>
        <li>
          {token ? <Link to='/orders/cart' >Cart</Link> : null}
        </li>
        <li>
          {token ? <Link to='/orders'>Orders</Link> : null}
        </li>
      </ul>
      <div className='logo'>
        <Link to='/FrontPage'>
          <h2>Luggage4All <img src={require('../components/img/airplane (1).png')} alt ="Luggage icon"/></h2>
          
        </Link>
      </div>
      <ul className='linksList'>
        <li>
          {!token ? <Fragment><Link to='/account/register'>Register</Link>/<Link to='/account/login'>Login</Link></Fragment> : null}
        </li>
        <li>
          {token ? <Fragment><Link to='/account'>Account</Link>/<Link to='/account/login'>{logOut()}</Link></Fragment> : null}
        </li>

      </ul>
    </nav>
  );
};

export default Navbar