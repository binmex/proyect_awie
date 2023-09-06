
const { Router } = require("express");
const { getProduct, getIdProducts, setProduct, fetchProduct, deleteProduct } = require("../controlers/Inventario_controler");
const check = require("../middlewares/auth")


const router = Router();
//consultar
router.get("/consultar/:id",getProduct);
//obtener ID
router.get("/obtenerid",check.auth, getIdProducts);
//ingresar producto
router.post("/ingreso", check.auth,setProduct);
//actualizar producto
router.patch("/actualizar/:idFromLabelProduct",fetchProduct);
//eliminar
router.delete("/eliminar/:idborrar",check.auth,deleteProduct)

module.exports = router