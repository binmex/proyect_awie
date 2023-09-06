import React, { useState } from 'react'
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { VistaTabla } from './Tables/VistaTabla';
import axios from 'axios';

export const VisualizarFactura = () => {
  const [factura,setFactura] = useState(0);
  const [products, setProducts] = useState([]);
  
  const searchFactura = () => {  
    axios.get(`http://localhost:4000/api/ventas/visualizar/${factura}`)
    .then((res) => {
      setProducts(res.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  

  return (
    <div className="contenido">
      <div className="cajaTablaVista">
        <h3>VISUALIZAR FACTURA</h3>
        <div className="contentVistaFactura">
          <div className="vistaVentasDivNav">
            <InputNumber inputId="integeronly" placeholder='# Factura' onValueChange={e=>setFactura(e.value)}/>
            <Button label="Buscar" onClick={()=>searchFactura()}/>
          </div>
          <div className="boxTableView">
            <VistaTabla products={products} setProducts={setProducts}/>
          </div>
        </div>
      </div>
    </div>
  )
}
