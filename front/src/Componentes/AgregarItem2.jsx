import React, { useState,useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import axios from "axios";

export const AgregarItem = () => {
  const [dateIngreso, setDateIngreso] = useState(null);
  const [name, setName] = useState('');
  const [compra, setCompra] = useState(0);
  const [venta, setVenta] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [data, setData] = useState([]);
  const [flag,setFlag] = useState(false)

  const saveData = async(data)=>{
    //axios.post("http://localhost:4000/api/inventario/ingreso",data).then(()=>console.log("agregado")).catch((error)=>console.error(error))

    try {
      const response = await fetch("http://localhost:4000/api/inventario/ingreso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
        console.log(result);
      } else {
        console.error("Error saving data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    if (flag === true) {
      const data2 = {
        nombre: name,
        cantidad: cantidad,
        compra: compra,
        venta: venta,
      };
      setData(data2);
      setFlag(false);
      console.log(data2);
      saveData(data);
    }
    // eslint-disable-next-line
  }, [flag]);
  
  return (
    <div className="contenido">
        <h3>AGREGAR</h3>

        <div className="boxInput">
          <div className="inputAdd">
            <label>Nombre</label>
            <InputText type="text" className="p-inputtext-sm" onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="inputAdd">
            <label>ID: </label>
            <InputNumber inputId="integeronly" name="id"/>
          </div>
          <div className="inputAdd">
            <span className="pi pi-dollar"></span>
            <label> Compra: </label>
            <InputNumber inputId="integeronly" name="compra" onChange={(e)=>setCompra(e.value)}/>
          </div>
          <div className="inputAdd">
            <span className="pi pi-dollar"></span>
            <label> Venta: </label>
            <InputNumber inputId="integeronly" name="venta" onChange={(e)=>setVenta(e.value)}/>
          </div>
          <div className="inputAdd">
            <label>Cantidad</label>
            <InputNumber inputId="integeronly" name="cantidadP" onChange={e=>setCantidad(e.value)}/>
          </div>
          <div className="inputAdd">
            <label>Ingreso </label>
            <Calendar
              value={dateIngreso}
              onChange={(e) => setDateIngreso(e.value)}
              showIcon
            />
          </div>
          <div className="inputAdd button" id="boxButtonAdd">
            <Button label="Limpiar" severity="warning"  />
            <Button label="Aceptar" onClick={()=>{setFlag(true)}} />
            <button type="button" onClick={()=>{setFlag(true)}}>Click Me!</button>
          </div>
        </div>
    </div>
  );
};
