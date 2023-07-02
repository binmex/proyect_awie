import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import { ChartRotacion1 } from "./chart/ChartRotacion1";

export const GananciasProducto = () => {
  const [date, setDate] = useState(null);
  return (
    <div className="contenido">
      <div className="cajaGanancias">
        <h3>GANANCIAS</h3>
        <div className="contentGanancias">
          <div className="gananciasDivNav">
            <div className="contentNav">
              <Calendar
                className="calen"
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
                placeholder="DESDE"
              />
            </div>
            <div className="contentNav">
              <Calendar
                className="calen"
                value={date}
                onChange={(e) => setDate(e.value)}
                showIcon
                placeholder="HASTA"
              />
            </div>
          </div>
          <div className="boxInputGanancias">
            <div className="boxDato"></div>
            <div className="boxChart" id="bigChart">
              <ChartRotacion1 tipo='polarArea'/>
            </div>
            <div className="boxDato"></div>
            <div className="boxDato"></div>
            <div className="boxChart">
              <ChartRotacion1 tipo='bar' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
