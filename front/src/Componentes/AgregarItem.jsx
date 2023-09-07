
import React, {useState} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import axios from "axios";

export const AgregarItem = () => {
  const [name, setName] = useState("");
  const [compra, setCompra] = useState("");
  const [venta, setVenta] = useState("");
  const [cantidad, setCantidad] = useState("");
  

  const aceptFunction = () => {
    const producto = {
      nombre: name,
      cantidad: cantidad,
      compra: compra,
      venta: venta
    };
    const token = JSON.parse(localStorage.getItem("login"))[1];
    const config = {
      headers:{
          Authorization: token
      }
    }
    console.log(config)
    axios
      .post("http://localhost:4000/api/inventario/ingreso",producto)
      .then((res) => {
        alert("agregado");
      }).catch((error)=>console.log("falta loguin"+error));

  };

  const limpiarCampos = () => {
    setName("");
    setCompra('');
    setVenta('');
    setCantidad('');
    console.log(name, cantidad, compra, compra, venta)
  };
  return (
    <div className="contenido">
      <div className="cajaAgregar">
        <h3>AGREGAR</h3>
        <div className="contentRotacion">
        <div className="boxInput">
        <div className="inputAdd">
            <label>Nombre</label>
            <InputText type="text" className="p-inputtext-sm" onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="inputAdd">
            <span className="pi pi-dollar"></span>
            <label> Compra: </label>
            <InputNumber inputId="integeronly" onChange={(e)=>setCompra(e.value)}/>
          </div>
          <div className="inputAdd">
            <span className="pi pi-dollar"></span>
            <label> Venta: </label>
            <InputNumber inputId="integeronly" onChange={(e)=>setVenta(e.value)}/>
          </div>
          <div className="inputAdd">
            <label>Cantidad</label>
            <InputNumber inputId="integeronly" onChange={e=>setCantidad(e.value)}/>
          </div>
          <div className="inputAdd button" id="boxButtonAdd">
            <Button label="Limpiar" severity="warning" onClick={()=>limpiarCampos()}/>
            <Button label="Aceptar" severity="success" onClick={()=>aceptFunction()}/>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};
