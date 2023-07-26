const {Router} = require('express');
const router = Router();
const _ = require('underscore');
const { pool } = require('../db.js');


<<<<<<< HEAD:back/API-RES/src/routes/Generar.jsx
router.get('/',async (req,res)=>{
=======
//pool para base 
router.get('/',(req,res)=>{
    res.json(cars)
})
//para obtener 
router.get('/test',async (req,res)=>{
>>>>>>> 48c346bfd5ea29dccfc512b1e96ab60d26e8fc61:back/API-RES/src/routes/cars.jsx
  try{
    const [fact] = await pool.query("SELECT * FROM factura");
    res.json(fact);
  }catch(error)
  {
    return res.status(500).json({ message: "Something goes wrong" });
  }

})
//para crear
router.post("/", (req, res) => {
    const id= String(cars.length + 1);
    const { brand, factory } = req.body;
    if (id && brand && factory) {
      const newCar = { ...req.body, id };
      cars.push(newCar);
      res.json(cars);
    } else {
      res.status(500).json({ error: "There was an error." });
    }
  });
//Para actualizar 
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { brand, factory } = req.body;
    if (id && brand && factory) {
      _.each(cars, (car, i) => {
        if (car.id === id) {
          car.brand = brand;
          car.factory = factory;
        }
      });
      res.json(cars);
    } else {
      res.status(500).json({ error: "There was an error." });
    }
  });
//Para Borrar
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (id) {
      _.each(cars, (car, i) => {
        if (car.id == id) {
          cars.splice(i, 1); //metodo splice sirve para remover
        }
      });
      res.json(cars);
    }
  });
  

module.exports = router;