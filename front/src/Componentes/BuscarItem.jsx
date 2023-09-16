import React, { useState, useEffect } from 'react'
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

export const BuscarItem = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [data,setData] = useState([]);
  
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem("login"));
    const config = {
      headers:{
          Authorization: token
      }
    }
      axios.get('http://localhost:4000/api/inventario/obtenerid',config).then((res)=>{
        setData(res.data)
      }).catch(()=>alert("login invalido"))
  },[]);

  const renderLabel = () => {
    if (selectedProduct !== null) {
      return (selectedProduct);
    } else {
      return (
        <label>No se ha seleccionado ningún producto</label>
      );
    }
  };
  return (
   
        <div className='content'>
        <div className='Modificar'>
          <h3> CONSULTAR</h3>

          <div className="boxBorrar">
            <Dropdown value={selectedProduct} onChange={(e) => setSelectProduct(e.value)} options={data} optionLabel="name_product" 
                placeholder="seleccione el producto" className="w-full md:w-14rem" />
         </div> 
          <div className="boxInput">
          <div className="inputAdd">
            <label>ID:</label>
            <label>{renderLabel().id_producto}</label>
          </div>
          <div className="inputAdd">
            <label>Nombre:</label>
            <label>{renderLabel().name_product}</label>
          </div>
          
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label> Compra: </label>
            <label>{renderLabel().purchase_price}</label>
          </div>
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label> Venta: </label>
            <label>{renderLabel().selling_price}</label>
          </div>
          <div className="inputAdd">
            <label>Cantidad:</label>
            <label>{renderLabel().quantity_init}</label>
          </div>
          
        
    </div>
    
    </div>
    </div>
  )
}
