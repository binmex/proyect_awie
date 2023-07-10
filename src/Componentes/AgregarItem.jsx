import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

export const AgregarItem = () => {
  const [date, setDate] = useState(null);
  return (
    <div className="contenido">
      <div className="cajaAgregar">
        <h3>AGREGAR</h3>

        <div className="boxInput">
          <div className="inputAdd">
            <label>Nombre</label>
            <InputText type="text" className="p-inputtext-sm" />
          </div>
          <div className="inputAdd">
            <label>ID: </label>
            <InputNumber inputId="integeronly" />
          </div>
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label> Compra: </label>
            <InputNumber inputId="integeronly"/>
          </div>
          <div className="inputAdd">
          <span className="pi pi-dollar"></span>
            <label> Venta: </label>
            <InputNumber inputId="integeronly" />
          </div>
          <div className="inputAdd">
            <label>Cantidad</label>
            <InputNumber inputId="integeronly" />
          </div>
          <div className="inputAdd">
            <label>Ingreso </label>
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value)}
              showIcon
            />
          </div>
          <div className="inputAdd button" id="boxButtonAdd">
            <Button label="Limpiar" severity="warning" />
            <Button label="Aceptar" severity="success" />
          </div>
        </div>
      </div>
    </div>
  );
};
