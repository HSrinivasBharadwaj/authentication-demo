import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response)
  
      const role = response.data.role;
      console.log("role", role);
  
      if (role === 'admin') {
        setIsAdmin(true);
        setIsUser(true);
      } else if (role === 'user') {
        setIsUser(true);
        setIsAdmin(false);
      }
  
      console.log("isAdmin", isAdmin);
      console.log("isUser", isUser);
  
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <h2>Protected Component</h2>
      {isAdmin && (
        <button>Admin Button</button>
      )}
      {isUser && (
        <button>User Button</button>
      )}
      <p>{message}</p>
    </div>
  );
};

export default ProtectedPage;
