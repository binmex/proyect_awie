const {Router} = require('express');
const router = Router();
const cars =  require('../sample.json');
const _ = require('underscore');
const { pool } = require('../db.js');



router.get('/',(req,res)=>{
    res.json(cars)
})

router.get('/test',async (req,res)=>{
  try{
    const [fact] = await pool.query("SELECT * FROM factura");
    res.json(fact);
  }catch(error)
  {
    return res.status(500).json({ message: "Something goes wrong" });
  }

})

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