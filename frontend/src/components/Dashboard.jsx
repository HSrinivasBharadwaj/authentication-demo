import React,{ useEffect, useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true
let firstRender = true;
const Dashboard = () => {
  const [user, setUser] = useState()
  //Here we can grab the information
  // Why withCredentials included is axios cant send cookies by default

  //Refresh Token function
  const refreshToken = async () => {
    const res = await axios.get('http://localhost:3000/api/refresh', {
      withCredentials: true
    }).catch((error) => console.log(error))
    const data = await res.data;
    return data
  }

  const sendRequest = async () => {
    const response = await axios.get('http://localhost:3000/api/user',{
      withCredentials: true
    }).catch((error) => console.log(error))
    const data = await response.data;
    return data;
  }

  
  useEffect(() => {
    //User is getting from the backend
    if(firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) =>setUser(data.user))
    }, 1000 * 28);
    return  () => clearInterval(interval);
  },[])
  return (
    <div>
      {user && <h1>{user.name}</h1>}
    </div>
  )
}

export default Dashboard