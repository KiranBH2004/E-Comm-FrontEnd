import React, { useState } from 'react'
import { register } from '../services/authService';
import { useNavigate } from 'react-router';

function Register() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function handleClick(e){
        e.preventDefault();
        try{
            const response = await register(email,password,confirmPassword);
            console.log(response);
            navigate("/")
        }
        catch(error){
            console.log(error);
        }
    }

  return (
    <div>
      <input type="email" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/> <br /><br />
      <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/> <br /><br />
      <input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/> <br /><br />
      <button onClick={handleClick}>Register</button>
    </div>
  )
}

export default Register
