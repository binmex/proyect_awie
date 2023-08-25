import React, { useState,useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
import axios from 'axios';
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";



export const ModItem = () => {
  const [selectedProduct, setSelectProduct] = useState(null);
  const [data,setData] = useState([]);
  const [name, setName] = useState("");
  const [compra, setCompra] = useState("");
  const [venta, setVenta] = useState("");
  const [cantidad, setCantidad] = useState("");
  
  const actualizarFuncion = () => {
    const producto = {
      nombre: name,
      cantidad: cantidad,
      compra: compra,
      venta: venta


    };
    const idFromLabelProduct = parseInt(document.getElementById("idLabel").innerText);
    axios
      .patch(`http://localhost:4000/api/inventario/actualizar/${idFromLabelProduct}`, producto)
      .then((res) => {
        alert("actualizado");
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
    <div className="content">
      <div className="Modificar">
        <h3>Abastecer</h3>
        <div className="boxBorrar">
        <label>ID</label>
            <Dropdown value={selectedProduct} onChange={(e) => setSelectProduct(e.value)} options={data} optionLabel="name_product" 
                placeholder="seleccione el producto" className="w-full md:w-14rem" />
         </div> 
        <div className="boxInput">
        <div className="inputAdd">
            <label>ID:</label>
            <label id="idLabel">{renderLabel().id_producto} </label>
          </div>
          <div className="inputAdd">
            <label>Nombre</label>
            <InputText
              type="text" value={renderLabel().name_product} readOnly
              className="p-inputtext-sm"  onChange={(e)=>setName(e.value)}/>
          </div>
          
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label>Compra: </label>
            <InputNumber inputId="integeronly" value={renderLabel().purchase_price} readOnly  onChange={(e)=>setCompra(e.value)}/>
          </div>
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label>Venta: </label>
            <InputNumber inputId="integeronly" value={renderLabel().selling_price} readOnly onChange={(e)=>setVenta(e.value)}/>
          </div>
          <div className="inputAdd">
            <label>Cantidad</label>
            <InputNumber inputId="integeronly" placeholder="Cantidad de entrada " onChange={(e)=>setCantidad(e.value)}/>
          </div>
          
          <div className="inputAdd button">
            <Button label="Limpiar" severity="warning" />
            <Button label="Actualizar" severity="info"  onClick={()=>actualizarFuncion()} />
          </div>
        </div>
      </div>
    </div>
  );
}
