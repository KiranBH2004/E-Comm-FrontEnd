import React, { useState } from 'react'
import { login } from '../services/authService';
import { Link, useNavigate } from 'react-router';

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const response = await login(email,password);
            console.log(response);
            localStorage.setItem("accessToken" , response.data.accesstoken);
            localStorage.setItem("role" , response.data.role);
            navigate("/home");
        }
        catch(error){
            console.log(error);
        }
        
    }
  return (
    <div>
      <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/> <br /><br />
      <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/> <br /><br />
      <button onClick={handleLogin}>Login</button><br />
      Don't Have an Account <button><Link to="/register">Register</Link></button>
    </div>
  )
}

export default Login
