import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";

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