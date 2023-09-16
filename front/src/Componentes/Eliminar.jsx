import React, { useState,useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import axios from 'axios';
import { Message } from 'primereact/message';


export const Eliminar = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [data,setData] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const showMessageAlert = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 5000); // Ocultar el mensaje después de 3 segundos
  };
  
  const funcionBorrar= () => {
    const token = JSON.parse(localStorage.getItem("login"));
    const config = {
      headers:{
          Authorization: token
      }
    }
    const idborrar= parseInt(document.getElementById("idborr").innerText);
    axios
      .delete(`http://localhost:4000/api/inventario/eliminar/${idborrar}`,config)
      .then((res) => {
        showMessageAlert(); 
      }).catch((error)=>console.error(error));

  };

  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem("login"));
    const config = {
      headers:{
          Authorization: token
      }
    }
    axios.get('http://localhost:4000/api/inventario/obtenerid',config).then((res)=>{
      setData(res.data)
    }).catch((error)=>console.log(error))
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
          {showMessage && (
              <Message
                severity="error"
                text="Eliminado"
                
                onClose={() => setShowMessage(false)}
              />
            )}
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
