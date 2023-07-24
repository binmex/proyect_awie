import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { ChartRotacion1 } from "./chart/ChartRotacion1";

export const RotacionProducto = () => {
  const [date, setDate] = useState(null);

  return (
    <div className="contenido">
      <div className="cajaRotacion">
        <h3>ROTACION</h3>
        <div className="contentRotacion">
          <div className="rotacionDivNav">
            <div className="contentNav">
              <InputNumber inputId="integeronly" placeholder="ID"/>
            </div>
            <div className="contentNav">
              <Calendar
                className="calen"
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon placeholder="DESDE"
              />
            </div>
            <div className="contentNav">
              <Calendar
                className="calen"
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon placeholder="HASTA"
              />
            </div>
          </div>
          <div className="boxInputRotacion">
            <div className="boxDato">
              <label>Hola</label>
              <p>perro</p>
            </div>
            <div className="boxDato"></div>
            <div className="boxDato"></div>
            <div className="boxDato"></div>
            <div className="boxChart">
              <ChartRotacion1 tipo='polarArea'/>
            </div>
            <div className="boxChart">
            <ChartRotacion1 tipo='radar'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
