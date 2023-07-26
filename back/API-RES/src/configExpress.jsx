const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//settings
app.set('port', process.env.PORT || 3001);
app.set('json spaces',2);

//midelware
app.use(morgan('dev'));
//soportando informacionÑ
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

//rutas
app.use('/api/generar',require('./routes/Generar.jsx'));

//starting the server
app.listen(app.get('port'),()=> console.log(`server in the por ${app.get('port')}`));