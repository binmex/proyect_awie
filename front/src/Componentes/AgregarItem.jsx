import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import axios from "axios";

export const AgregarItem = () => {
  const [dateIngreso, setDateIngreso] = useState(null);
  const [productos, setProductos] = useState([]);

  const aceptFunction = (e) => {
    //debo tomar todos los campos
    e.preventDefault();
    const compraValue = parseFloat(e.target.compra.value.replace(",", ""));
    const ventaValue = parseFloat(e.target.venta.value.replace(",", ""));
    const cantidadValue = parseFloat(e.target.cantidadP.value);

    const producto = {
      nombre: e.target.nombre.value,
      cantidad: cantidadValue,
      compra: compraValue,
      venta: ventaValue,
    };
    setProductos(producto);
    axios
      .post("http://localhost:4000/api/inventario/ingreso", productos)
      .then((res) => {
        console.log(res);
        alert("agregado");
      });
  };

  const prueba =()=>{
    axios.get("http://localhost:4000/api/inventario/obtenerid").then((data)=>{
        console.log(data);
    })
  }

  useEffect(()=>{
    prueba();
  },[])

  return (
    <div className="contenido">
      <form className="cajaAgregar" onSubmit={aceptFunction}>
        <h3>AGREGAR</h3>

        <div className="boxInput">
          <div className="inputAdd">
            <label>Nombre</label>
            <InputText type="text" className="p-inputtext-sm" name="nombre" />
          </div>
          <div className="inputAdd">
            <label>ID: </label>
            <InputNumber inputId="integeronly" name="id" />
          </div>
          <div className="inputAdd">
            <span className="pi pi-dollar"></span>
            <label> Compra: </label>
            <InputNumber inputId="integeronly" name="compra" />
          </div>
          <div className="inputAdd">
            <span className="pi pi-dollar"></span>
            <label> Venta: </label>
            <InputNumber inputId="integeronly" name="venta" />
          </div>
          <div className="inputAdd">
            <label>Cantidad</label>
            <InputNumber inputId="integeronly" name="cantidadP" />
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
            <Button label="Limpiar" severity="warning" type="submit" />
            <Button label="Aceptar" severity="success" />
          </div>
        </div>
      </form>
    </div>
  );
};
