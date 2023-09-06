const { getFacturas, getFactura, addVenta, getProductos } = require("../controlers/Ventas_controler");
const { Router } = require("express");
const check = require("../middlewares/auth")

const router = Router();

// GET all Employees
router.get("/visualizar", check.auth, getFacturas);

// GET An Employee
router.get("/visualizar/:id", getFactura);
//obtener productos
router.get("/getproductos",getProductos)

router.post("/addventa/:quantities", addVenta)

module.exports = router