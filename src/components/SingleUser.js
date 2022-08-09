import React, { useEffect, useState } from "react";
import '../style/SingleUser.css'
import { Link } from 'react-router-dom'

const SingleUser = ({ user, setUser, setToken, token }) => {
  //maybe put V this at the top level and pass it as props if we need it in other sections? cart?
  // const userData = localStorage.getItem('userObject')
  // const user = JSON.parse(userData)
  console.log('trying to pull user:', user.username)

  return (
    //need to store all user data in local storage so that it persists on refresh/reload.
    //perhaps just store user/username in storage and create fetch calls in useEffect in each component that needs it.
    //storing user id wouldn't be bad idea either.
    //the simplest way would be to store the entire object in local storage and pull it when needed.
    <div className='singleUserContainer'><h1>{`Hello, ${user.username}!`}</h1>
      <div className='singleUser'> <img src={user.imageURL} alt={user.username}></img>
        <div className='accountInfo'>
          <p><strong>Name:</strong>{user.firstName}  {user.lastName} </p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Orders:</strong><Link to='/acccount/orders'>My Orders</Link></p>
        </div>
      </div>

      <button onClick={() => {
        setToken('')
        setUser({})
        localStorage.clear()
        // need to redirect to login page.
      }}>Log out</button></div >
  )


}

export default SingleUser;