
const { Router } = require("express");
const { getProduct, getIdProducts, setProduct } = require("../controlers/Inventario_controler");

const router = Router();

router.get("/consultar/:id", getProduct);

router.get("/obtenerid", getIdProducts);

router.post("/ingreso", setProduct);

module.exports = router