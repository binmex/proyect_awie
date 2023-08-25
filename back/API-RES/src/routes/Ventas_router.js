const { getFacturas, getFactura, addVenta, getProductos } = require("../controlers/Ventas_controler");
const { Router } = require("express");

const router = Router();

// GET all Employees
router.get("/visualizar", getFacturas);

// GET An Employee
router.get("/visualizar/:id", getFactura);
//obtener productos
router.get("/getproductos",getProductos)

router.post("/addventa", addVenta)

module.exports = router