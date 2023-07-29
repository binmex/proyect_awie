const { getFacturas, getFactura } = require("../controlers/Ventas_controler");
const { Router } = require("express");

const router = Router();

// GET all Employees
router.get("/visualizar", getFacturas);

// GET An Employee
router.get("/visualizar/:id", getFactura);

module.exports = router