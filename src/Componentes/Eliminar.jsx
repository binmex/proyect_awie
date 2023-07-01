import React from "react";
import { Button } from "primereact/button";


export const Eliminar = () => {
 
  return (
    <div className='content'>
        <div className='Modificar'>
          <h3>ELIMINAR</h3>
         < div className='boxBorrar'>
         <label>ID: </label>
         <input type="number" id="eliminar" name="eliminar" />
         <button  type="submit">Seleccionar</button>
          </div> 
          <div className="boxInput">
        <div className="inputAdd">
            <label>ID: </label>
            
          </div>
          <div className="inputAdd">
            <label>Nombre:</label>
    
        
          </div>
          
          <div className="inputAdd">
            <label> Compra: </label>
            
          </div>
          <div className="inputAdd">
            <label> Venta: </label>
            
          </div>
          <div className="inputAdd">
            <label>Cantidad:</label>
            
          </div>
          <div className="inputAdd">
            <label>Ingreso:</label>
            
          </div>
          
          <div className="inputAdd2 button">
            <Button label="Borrar" severity="danger" />
          </div>
        </div>
          

        </div>
    </div>
  )
}
