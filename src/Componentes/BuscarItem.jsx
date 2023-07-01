import React from 'react'
import { CascadeSelect } from 'primereact/cascadeselect';
export const BuscarItem = () => {
  return (
   
        <div className='content'>
        <div className='Modificar'>
          <h3> CONSULTAR</h3>

          < div className='boxBorrar'>
          <CascadeSelect disabled placeholder="ID" style={{ minWidth: '14rem' }} />
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
        
    </div>
    
    </div>
    </div>
  )
}
