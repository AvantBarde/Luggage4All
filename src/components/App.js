import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import {
  getAPIHealth,
} from "../FETCHREQUESTS";
import "../style/App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import {
  Login,
  Navbar,
  Orders,
  Register,
  Cart,
  Users,
  Products,
  SingleProduct,
  SingleUser,
  FrontPage,
} from "../components";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const tokenFromStorage = localStorage.getItem("jwt");
  const userFromStorage = localStorage.getItem('userObject')
  const parsedUser = JSON.parse(userFromStorage)
  const [token, setToken] = useState(tokenFromStorage);
  const [user, setUser] = useState(parsedUser);
  const [cartInfo, setCartInfo] = useState({});
  const [retainUserName, setRetainUserName] = useState('');
  
  useEffect(() => {
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    getAPIStatus();
  }, []);

  console.log(retainUserName);

  return (
    <div className="app-container">
      <Router>
        <Navbar token={token} />
        <div className="content">
          <Switch>
            <Route exact path="/FrontPage">
              <>
                {/* should probably create a home component */}
                {user ? <h1>Welcome {user.username}!</h1> : null}
                <FrontPage />
               { console.log(APIHealth)}
              </>
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/account">
              {token ? <SingleUser user={user} setToken={setToken} token={token} setUser={setUser} /> : <Redirect to='/account/login' />}
            </Route>
            <Route path="/users" >
              <Users user={user} />
            </Route>
            <Route path="/account/login">
              {token ? <Redirect to='/' /> : <Login setToken={setToken} setUser={setUser} user={user} retainUserName = {retainUserName} setRetainUserName = {setRetainUserName}/>}
            </Route>
            <Route path="/account/register">
              {token ? <Redirect to='/' /> : <Register retainUserName = {retainUserName} setRetainUserName = {setRetainUserName}/>}
            </Route>
            <Route exact path="/orders">
              <Orders user={user} />
            </Route>
            <Route path="/orders/cart">
              <Cart user={user} cartInfo = {cartInfo} setCartInfo = {setCartInfo}/>
            </Route>
            <Route path="/products/:productId">
              <SingleProduct user={user} setCartInfo = {setCartInfo} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;