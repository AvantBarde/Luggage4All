import React, { useState, useEffect, Fragment } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
<<<<<<< HEAD
import ProductCard from './product_card';
=======
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import  Products  from "./products";
import  OrderProducts  from "./order_products";
import  Register from "./register";
 import  AddToCart from "./addToCart";

 import  Home  from "./Home";
import UserProfile from './userProfile';
>>>>>>> 2180d4b5db6aafbc4721d9a6220ea5701195e311

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [adminSignedIn, setAdminSignedIn] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [token, setToken] = useState(""); 
  const [products, setProducts] = useState([]);
  const [guestCart, setGuestCart] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartChange, setCartChange] = useState(0);

 
  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <>
    <div className="app-container">
      <h1>Hello, World!</h1>
      <p>API Status: {APIHealth}</p>
      <ProductCard />
    </div>
    <Switch>
      <Route exact path = "/products">
        <Products token = {token} setToken = {setToken} products = {products} setProducts = {setProducts} originalProducts = {originalProducts} setOriginalProducts = {setOriginalProducts} shoppingCart = {shoppingCart} setShoppingCart = {setShoppingCart} guestCart = {guestCart} setGuestCart = {setGuestCart} searchItem = {searchItem}  setSearchItem = {setSearchItem} cartChange = {cartChange} setCartChange = {setCartChange}/>
      </Route>
      <Route exact path = "/users/:userId">
        <UserProfile token = {token} setToken = {setToken} adminSignedIn = {adminSignedIn} setAdminSignedIn = {setAdminSignedIn} setSignedIn = {setSignedIn}/>
      </Route>
      <Route exact path = "/register">
        <Register token = {token} setToken = {setToken} signedIn = {signedIn} setSignedIn = {setSignedIn} />
      </Route>
      <Route exact path = "/login">
        <Login token = {token} setToken = {setToken} signedIn = {signedIn} setSignedIn = {setSignedIn} />
      </Route>

  
    </Switch>
    
    </>
    
    
  );
};

export default App;
