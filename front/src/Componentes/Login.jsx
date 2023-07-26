import React from 'react';
import logo from '../Assets/logoCafe.svg';

const Login = () => {
  
  return (
    <div className='container'>
      <div className="login">

        <span>
          <img src={logo} alt='logo' className='logologin' />
        </span>
        <form>
          <div className="form-group">

            <span className="pi pi-user"></span>
            <input type="text" id="username" name="username" className='formcaja' />
          </div>
          <div className="form-group">
          <span className="pi pi-lock"></span>

            <input type="password" id="password" name="password" className='formcaja' />
          </div>
          <button className='but_login' type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
export default Login;

