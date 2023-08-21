const { pool } = require("../db");

exports.setProduct = async (req, res) => {
  //INSERT INTO Producto (name_product,quantity_init,purchase_price,selling_price) VALUES ('Leche 1L',10, 35000, 45000);
  try {
    console.log(req.body)
    const { nombre, compra, venta, cantidad } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Producto (name_product,quantity_init,purchase_price,selling_price) VALUES (?, ?, ?,?)",
      [nombre, cantidad, compra,venta]
    );

    res.status(201).json({
      id: rows.insertId,
      nombre,
      compra,
      venta,
      cantidad
    });
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong"+error });
  }
};

exports.fetchProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, compra, venta, cantidad, fechaingreso } = req.body;
    const [result1] = await pool.query(
      "UPDATE producto SET name_product = IFNULL(?, name_product), purchase_price = IFNULL(?, purchase_price), selling_price = IFNULL(?,selling_price) WHERE id_producto = ?",
      [nombre, compra, venta, id]
    );
    const [result2] = await pool.query(
      "UPDATE StockMovimiento SET quantity_stock = IFNULL(?, quantity_stock), date_of_movement = IFNULL(?, date_of_movement) WHERE product_id = ?",
      [cantidad, fechaingreso, id]
    );
    if (result1.affectedRows === 0 && result2.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM StockMovimiento inner join producto on StockMovimiento.product_id = producto.id_producto WHERE product_id = ?",
      [id]
    );
    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something goes wrong: " + error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    //se elimina de stockMovimiento
    const [stock] = await pool.query('delete from stockmovimiento where product_id = ?',[id]);
    //se elimina de la tabla venta
    const [venta] = await pool.query('delete from venta where product_id = ?',[id]);
    //se elimina de la tabl producto
    const [rows] = await pool.query('delete from producto where id_producto = ?',[id]);
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Producto no found" });
    }
    if(rows.affectedRows > 0){
      return res.send("eliminado")
    }
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong" });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "select * from producto where id_producto = ?",
      [id]
    );
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong" });
  }
};
exports.getIdProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("select * from producto");
    if (rows.length <= 0) {
      return res.status(404).json({ message: "IdProduct not found" });
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "something goes wrong" });
  }
};
