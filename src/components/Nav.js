import React from "react";
import { Link } from "react-router-dom";
import '../style/Nav.css'

const Navbar = ({ token }) => {
  return (
    <nav id="navbar">
      <div className='logo'>
        <Link to='/FrontPage'>
          {/* <img src='https://cdn-icons.flaticon.com/png/128/2314/premium/2314834.png?token=exp=1658543142~hmac=31e21e4b5128dd06de480abdbc6fa68c'></img> */}
          <h2>Luggage4All</h2>

        </Link>
      </div>
      <ul className='linksList'>
        <li>
          {token ? <Link to="/products">Products</Link> : null}
        </li>
        <li>
          {token ? <Link to='/orders/cart' >Cart</Link> : null}
        </li>
        <li>
          {token ? <Link to='/orders'>Orders</Link> : <Link to='/account/login'>Login</Link>}
        </li>
        <li>
          {!token ? <Link to='/account/register'>Register</Link> : null}
        </li>
        <li>
          {token ? <Link to='/account'>Account</Link> : null}
        </li>

      </ul>
    </nav>
  );
};

export default Navbar