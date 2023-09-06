import React, { useState } from 'react';
import logo from '../Assets/logoCafe.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SaveLocalStorage } from '../helpers/SaveLocalStorage';


const Login = () => { 
  const navigate = useNavigate();
  const[user, setUser] = useState('');
  const[password,setPassword] = useState('');

  const loginButton = (e)=>{
    const credential ={
      nombre: user,
      contraseña: password
    }
    axios.post("http://localhost:4000/api/login/succes",credential).then((res) => {
      //redireccionar a dashboard
      SaveLocalStorage("login",res.data.token)
      navigate('/dashboard');
    }).catch((error)=>
    alert("credenciales incorrectas")
    );
  }

  
  
  return (
    <div className='container'>
      <div className="login">

        <span>
          <img src={logo} alt='logo' className='logologin' />
        </span>
        <form>
          <div className="form-group">

            <span className="pi pi-user"></span>
            <input type="text" id="username" name="username" className='formcaja' onChange={(e) => setUser(e.target.value)}/>
          </div>
          <div className="form-group">
          <span className="pi pi-lock"></span>

            <input type="password" id="password" name="password" className='formcaja' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className='but_login' type='submit' onClick={(e)=>loginButton(e)}>Login</button>
        </form>
      </div>
    </div>
  )
}
export default Login;

