
const { Router } = require("express");
const { getProduct, getIdProducts, setProduct } = require("../controlers/Inventario_controler");

const router = Router();

// GET all Producto ID
router.get("/consultar/:id", getProduct);

// GET An Employee
router.get("/obtenerid", getIdProducts);
// GET An Employee
//nombre,id,compra,venta,cantidad,ingreso
router.post("/ingreso", setProduct);

module.exports = router