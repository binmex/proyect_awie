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