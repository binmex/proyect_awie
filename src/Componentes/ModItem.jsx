import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";


export const ModItem = () => {
  const [date, setDate] = useState(null);
  return (
    <div className="content">
      <div className="Modificar">
        <h3>Modificar</h3>
        <div className="boxInput">
        <div className="inputAdd">
            <label>ID: </label>
            <InputNumber inputId="integeronly" />
          </div>
          <div className="inputAdd">
            <label>Nombre</label>
            <InputText
              type="text"
              className="p-inputtext-sm"
            />
          </div>
          
          <div className="inputAdd">
            <label>Compra: </label>
            <InputNumber inputId="integeronly" />
          </div>
          <div className="inputAdd">
            <label>Venta: </label>
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
          <div className="inputAdd button">
            <Button label="Limpiar" severity="warning" />
            <Button label="Actualizar" severity="info" />
          </div>
        </div>
      </div>
    </div>
  );
}
