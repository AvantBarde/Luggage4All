import React, { useEffect, useState } from "react";
import '../style/SingleUser.css'
import { Link } from 'react-router-dom'

const SingleUser = ({ user, setUser, setToken, token }) => {
  console.log('trying to pull user:', user.username)
  console.log('trying to pull user:', user)

  return (

    <div className='singleUserContainer'><h1>{`Hello, ${user.username}!`}</h1>
      <div className='singleUser'> <img src={require('./img/bag8.jpg')} alt={user.username}></img>
        <div className='accountInfo'>
          <p><strong>Name:</strong>{user.firstName}  {user.lastName} </p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Orders:</strong><Link to='/orders'>My Orders</Link></p>
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