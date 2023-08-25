import React, { useState,useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import axios from 'axios';


export const Eliminar = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [data,setData] = useState([]);
  const funcionBorrar= () => {



    const idborrar= parseInt(document.getElementById("idborr").innerText);
  
    axios
      .delete(`http://localhost:4000/api/inventario/eliminar/${idborrar}`)
      
      .then((res) => {
        alert("borrado");
      }).catch((error)=>console.error(error));

  };

  useEffect(()=>{
    axios.get('http://localhost:4000/api/inventario/obtenerid').then((res)=>{
      setData(res.data)
    })
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
          <h3>ELIMINAR</h3>
          < div className='boxBorrar'>
         <label>ID: </label>
         <Dropdown value={selectedProduct} onChange={(e) => setSelectProduct(e.value)} options={data} optionLabel="name_product" 
                placeholder="seleccione el producto" className="w-full md:w-14rem" />
          </div> 
          <div className="boxInput">
          <div className="inputAdd">
            <label>ID: </label>
            <label id="idborr">{renderLabel().id_producto}</label>
            
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
          
          
    <div className="imputBor">
            <Button label="Borrar" severity="danger"  onClick={()=>funcionBorrar()}/>
      </div>
      </div>
    </div>
    
    </div>
  )
}
