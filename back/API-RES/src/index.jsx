const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3001);
app.set('json spaces',2);

//midelware
app.use(morgan('dev'));
//soportando informacion
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//rutas
app.use(require('./routes/test.jsx'));
app.use('/api/cars',require('./routes/cars.jsx'));

//starting the server
app.listen(app.get('port'),()=> console.log(`server in the por ${app.get('port')}`));