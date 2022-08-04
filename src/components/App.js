import React, { useState, useEffect, Fragment } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import { Route, Switch } from "react-router-dom";
import Login from "./login";
import Products from "./products";
// import  OrderProducts  from "./order_products";
import Register from "./register";
//  import  AddToCart from "./addToCart";

import UserProfile from "./userProfile";

const App = () => {
  const localStorageToken = localStorage.getItem("jwt");

  const [token, setToken] = useState(localStorageToken);
  const [signedIn, setSignedIn] = useState(false);
  const [adminSignedIn, setAdminSignedIn] = useState(false);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState([]);
  const [guestCart, setGuestCart] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartChange, setCartChange] = useState(0);
  const [APIHealth, setAPIHealth] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
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
      </div>

      <Switch>
        <Route exact path="/products">
          <Products
            token={token}
            setToken={setToken}
            products={products}
            setProducts={setProducts}
            originalProducts={originalProducts}
            setOriginalProducts={setOriginalProducts}
            shoppingCart={shoppingCart}
            setShoppingCart={setShoppingCart}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            cartChange={cartChange}
            setCartChange={setCartChange}
          />
        </Route>
        <Route exact path="/users/:userId">
          <UserProfile
            token={token}
            setToken={setToken}
            adminSignedIn={adminSignedIn}
            setAdminSignedIn={setAdminSignedIn}
            setSignedIn={setSignedIn}
          />
        </Route>
        <Route exact path="/register">
          <Register
            token={token}
            setToken={setToken}
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPass={confirmPass}
            setConfirmPass={setConfirmPass}
            error={error}
            setError={setError}
          />
        </Route>
        <Route exact path="/login">
          <Login
            token={token}
            setToken={setToken}
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            confirmPass={confirmPass}
            setConfirmPass={setConfirmPass}
          />
        </Route>
      </Switch>
    </>
  );
};

export default App;
