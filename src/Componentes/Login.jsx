import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import style from '../Tool/Style'
import { Avatar, Button, Container , TextField, Typography} from '@mui/material';
const Login=()=>{

return(
  <Container maxWidth="xs">
<div style={style.paper}>
<Avatar style={style.avatar}>
   <LockOutlinedIcon style={style.icon}/> 
</Avatar>
<Typography component="h1" variant="h5">
 El sitio del tinto  
</Typography>
<form style={style.form}>

<TextField variant="outlined" label="Ingrese su Usuario" name="username" fullWidth margin="normal"/>
<TextField variant="outlined" type="password" label="Ingrese su Constraseña" name="password" fullWidth margin="normal"/>
<Button type="submit" fullWidth variant ="contained" color="primary" style={style.submit}>
    Enviar 
</Button>
</form>
</div>
  </Container>  
)
 }
 export default Login;