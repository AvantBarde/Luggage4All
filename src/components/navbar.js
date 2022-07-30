import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";



/*const Nav = ({ token }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    return (
        <div className="NavBarClass">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/products">Shop</Link>
            </li>
            
            {isLoggedIn ? (
                <li>
                    <Link to="/">Cart</Link>
                </li>
            ) : (
                null
            )}
            
            {!isLoggedIn ? (
                <li>
                    <Link to="/register">Sign Up</Link>
                </li>
            ) : (
                <li>
                    <Link to="/users/:userId">Profile</Link>
                </li>
            )}
            
            {!isLoggedIn ? (
                <li>
                    <Link to="/login">Log In</Link>
                </li>
            ) : (
                <li>
                    <LogoutButton />
                </li>
            )}
        </div>
    )
}

export default Nav;
*/


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from "react-router-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Nav = ({token}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <LinkContainer>
          <Navbar.Brand href="/">Grace Shopper</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/products"}>Shop</Nav.Link>
            {isLoggedIn ? (
                <Nav.Link as={Link} to={"/cart"}>Cart</Nav.Link>
            ) : (
                null
            )}
            {!isLoggedIn ? (
                <Nav.Link as={Link} to={"/register"}>Sign Up</Nav.Link>
            ) : (
                <Nav.Link as={Link} to={"/users/:userId"}>Profile</Nav.Link>
            )}
            {!isLoggedIn ? (
                <Nav.Link as={Link} to={"/login"}>Log In</Nav.Link>
            ) : (
                <LogoutButton />
            )}
          </Nav>
          </LinkContainer>
        </Container>
      </Navbar>
    </div>
    )
}

export default Nav;