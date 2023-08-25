const { pool } = require("../db");

exports.getFacturas = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "select id_invoice, date_of_sell,value_sold,name_product,selling_price,quantity_sell from factura inner join venta on(invoice_id=id_invoice) inner join producto on(product_id=id_producto)"
    );
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

exports.getFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "select id_invoice, date_of_sell,value_sold,name_product,selling_price,quantity_sell from factura inner join venta on(invoice_id=id_invoice) inner join producto on(product_id=id_producto) where id_invoice = ? and invoice_id = ?",
      [id,id]
    );
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
