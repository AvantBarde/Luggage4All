// import React, {useState, useEffect} from "react";
// import { Link } from "react-router-dom";
// import LogoutButton from "./logoutButton";
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import { LinkContainer } from "react-router-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const NavigationBar = ({token}) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         if (localStorage.getItem("token")) {
//             setIsLoggedIn(true);
//         } else {
//             setIsLoggedIn(false);
//         }
//     }, [token]);

//     return (
//     <div>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//         <LinkContainer>
//           <Navbar.Brand href="#">Grace Shopper</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link to={"#products"}>Shop</Nav.Link>
//             {isLoggedIn ? (
//                 <Nav.Link to={"#cart"}>Cart</Nav.Link>
//             ) : (
//                 null
//             )}
//             {!isLoggedIn ? (
//                 <Nav.Link to={"#register"}>Sign Up</Nav.Link>
//             ) : (
//                 <Nav.Link to={"#users:userId"}>Profile</Nav.Link>
//             )}
//             {!isLoggedIn ? (
//                 <Nav.Link to={"#login"}>Log In</Nav.Link>
//             ) : (
//                 <LogoutButton />
//             )}
//           </Nav>
//           </LinkContainer>
//         </Container>
//       </Navbar>
//     </div>
//     )
// }

// export default NavigationBar;



import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from "react-router-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



function NavigationBar({isLoggedIn, setIsLoggedIn, token}) {
    console.log(token)
    useEffect(() => {
        //If there's a token in localStorage, isLoggedIn is true
        localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false);
      }, [token]);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Grace Shopper</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="login">Login</Nav.Link>
            <Nav.Link href="register">Register</Nav.Link>
            <Nav.Link href="products">Products</Nav.Link>
            <Nav.Link href="cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
  );
}

export default NavigationBar;