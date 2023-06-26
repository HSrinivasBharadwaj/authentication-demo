import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, setRole } from '../api/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      })
      const role = response.data.role;
      const token = response.data.token;
      localStorage.setItem('token', token);
      //First check token is there or not
      if(token) {
        if(role === "admin") {
          navigate("/protected")
        }
        else {
          navigate("/user/dashboard")
        }
      }
      else {
        navigate("/login")
      }
      //if token is not there  - navigate to login page
     
      //Storing in the local storage 
      

      // if (role === 'admin') {
      //   navigate("/protected");
      // } else {
      //   navigate("/user/dashboard");
      // }
      // dispatch(login());
      // dispatch(setRole(response.data.role)); 
      // navigate("/admin/dashboard")
      // console.log("Login Success")
      // navigate("/protected")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: 30, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  )
}

export default Login