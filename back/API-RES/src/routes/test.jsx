const {Router} = require('express');
const router = Router();
//Este no lo entendi creo que es para hacerlo por fecth 
router.get('/', (req, res) => {
    fetch("https://reqres.in/api/users?page=1")
      .then((respuesta) => respuesta.json())
      .then(
        (resultado) => {
          res.json(resultado.data);
        },
        (error) => {
          alert(error);
        }
      );
  });
  
module.exports = router;