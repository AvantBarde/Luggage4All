import React, { useEffect, useState } from "react";
import '../style/SingleUser.css'
import { Link } from 'react-router-dom'

const SingleUser = ({ user, setUser, setToken, token }) => {
  console.log('trying to pull user:', user.username)
  console.log('trying to pull user:', user)


  function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  const ampm = h >= 12 ? 'pm' : 'am';
  const H = h > 12 ? h = h - 12 : h;
  return H + ":" + m + ampm;  
}

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
       <div className="card p-4"> 
       <div className=" image d-flex flex-column justify-content-center align-items-center">
         <button className="btn btn-secondary"> 
         <img src="https://i.imgur.com/wvxPV9S.png" height="100" width="100" /></button> <span className="name mt-3">Hello, {user.username}</span>
         <div className="d-flex flex-row justify-content-center align-items-center gap-2"> <span className="idd1">Last Logged In: {startTime()}</span> <span><i className="fa fa-copy"></i></span> </div> 
          <div className=" d-flex mt-2 editProfileButton"> <Link to="./editProfile" style = {{ border: '1px solid black', padding: '10px', background: 'black', color: 'white'}}>Edit Profile Details</Link> </div> 
          <p className=" px-2 rounded mt-4 date"><Link to='/orders'>Check Orders</Link></p> </div> </div>
</div>
  )


}

export default SingleUser;