import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Nav = ({ token }) => {
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
                <Link to="/Products">Shop</Link>
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
                    <Link to="/">Sign Up</Link>
                </li>
            ) : (
                <li>
                    <Link to="/">Profile</Link>
                </li>
            )}
            
            {!isLoggedIn ? (
                <li>
                    <Link to="/">Log In</Link>
                </li>
            ) : (
                <li>
                    <Link to="/">Sign Out</Link>
                </li>
            )}
        </div>
    )
}

export default Nav;