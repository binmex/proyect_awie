import React from 'react'
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { VistaTabla } from './Tables/VistaTabla';

        



export const VisualizarFactura = () => {
  return (
    <div className="contenido">
      <div className="cajaTablaVista">
        <h3>VISUALIZAR FACTURA</h3>
        <div className="contentVistaFactura">
          <div className="vistaVentasDivNav">
            <InputNumber inputId="integeronly" placeholder='# Factura'/>
            <Button label="Buscar" />
          </div>
          <div className="boxTableView">
            <VistaTabla/>
            <label >Total: XXXXXX</label>
          </div>
        </div>
      </div>
    </div>
  )
}
