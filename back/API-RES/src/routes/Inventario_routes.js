
const { Router } = require("express");
const { getProduct, getIdProducts, setProduct, fetchProduct, deleteProduct } = require("../controlers/Inventario_controler");

const router = Router();
//consultar
router.get("/consultar/:id", getProduct);
//obtener ID
router.get("/obtenerid", getIdProducts);
//ingresar producto
router.post("/ingreso", setProduct);
//actualizar producto
router.patch("/actualizar/:id", fetchProduct);
//eliminar
router.delete("/eliminar/:id",deleteProduct)

module.exports = router