import React from 'react';
import logo from '../Assets/logoCafe.svg';

const Login=()=>{

return(
  <div className='container'>
  <div className="login">
   
   <span>
     <img src={logo} alt='logo' className='app-logo'/>
     </span>
  <form>
    <div class="form-group">

      <input type="text" id="username" name="username" />
    </div>
    <div class="form-group">
      
      <input type="password" id="password" name="password"/>
    </div>
    <button type="submit">Login</button>
  </form>
</div>
</div>
)
 }
 export default Login;

 