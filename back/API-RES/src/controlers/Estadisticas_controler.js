const { pool } = require("../db");

exports.getRotacion = async (req, res) => {
    try {
      const { id,dateInit,dateEnd } = req.params;
      const [inicio] = await pool.query(
        "SELECT (COALESCE((SELECT SUM(quantity_stock) FROM stockmovimiento WHERE date_of_movement <=? AND movement_type = 'entrada' and product_id =?), 0) -COALESCE((SELECT SUM(quantity_stock) FROM stockmovimiento WHERE date_of_movement <= ? AND movement_type = 'salida' and product_id = ?), 0)) as inicioPeriodo",
        [dateInit,id,dateInit,id]
      );
      const [finalizacion] = await pool.query(
        "SELECT (COALESCE((SELECT SUM(quantity_stock) FROM stockmovimiento WHERE date_of_movement <=? AND movement_type = 'entrada' and product_id =?), 0) -COALESCE((SELECT SUM(quantity_stock) FROM stockmovimiento WHERE date_of_movement <= ? AND movement_type = 'salida' and product_id = ?), 0)) as finPeriodo",
        [dateEnd,id,dateEnd,id]
      );

      const [cantVendida] = await pool.query(
        "SELECT COALESCE(SUM(quantity_stock), 0) as cantidadVen FROM stockmovimiento WHERE date_of_movement BETWEEN ? AND ? AND movement_type = 'salida' AND product_id = ?",
        [dateInit,dateEnd,id]
      );
      
      if (inicio.length <= 0) {
        return res.status(404).json({ message: "NO es posible obtener los datos de rotacion" });
      }
      res.send({
        inicio: inicio[0].inicioPeriodo,
        fin: finalizacion[0].finPeriodo,
        cantidad: cantVendida[0].cantidadVen,
        rotacion: Number(cantVendida[0].cantidadVen)/((Number(inicio[0].inicioPeriodo)+Number(finalizacion[0].finPeriodo))/2)
      })
    } catch (error) {
      return res.status(500).json({ message: "something goes wrong: "+error });
    }
  };

  exports.getGanancias = async (req, res) => {
    try {
      const { id, dateInit, dateEnd } = req.params;
  
      // Consulta SQL para calcular la rentabilidad por unidad en el período de tiempo especificado
      const consultaSQL = `
        SELECT
          SUM(v.quantity_sell * p.selling_price) AS Ingresos,
          SUM(v.quantity_sell * p.purchase_price) AS Costos
        FROM
          Producto p
        JOIN
          Venta v ON p.id_producto = v.product_id
        JOIN
          Factura f ON v.invoice_id = f.id_invoice
        WHERE
          p.id_producto = ?
          AND f.date_of_sell >= ?
          AND f.date_of_sell <= ?
      `;
      const valores = [id, dateInit, dateEnd];
      const consultaFechaVentaSQL = `
      SELECT
      product_id,
      date_of_movement,
      SUM(quantity_stock) AS Total_Vendido
  FROM
      StockMovimiento
  WHERE
  product_id=? AND
      date_of_movement >= ?
      AND date_of_movement <= ?
      AND movement_type = 'salida'
  GROUP BY
      product_id, date_of_movement
  ORDER BY
      Total_Vendido DESC
  LIMIT 1
  `;
  
  
      const valores1 = [dateInit, dateEnd];
  
      const resultado = await pool.query(consultaSQL, valores);
  
      // Realiza los cálculos necesarios para obtener la rentabilidad por unidad
      const ingresos = resultado.rows[0].ingresos;
      const costos = resultado.rows[0].costos;
      const gananciaNeta=(ingresos - costos)
      const rentabilidadPorUnidad = (ingresos - costos) / cantidadVendida;
      const resultadoFechaVenta = await pool.query(consultaFechaVentaSQL, valores);
    const fechaMayorVenta = resultadoFechaVenta.rows[0].date_of_movement;
      
    
      res.json({ rentabilidadPorUnidad ,gananciaNeta,costos,fechaMayorVenta});
      
    } catch (error) {
      return res.status(500).json({ message: "something goes wrong: "+error });
    }
  };