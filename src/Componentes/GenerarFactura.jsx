
import React, { useState} from 'react';
import { PickList } from 'primereact/picklist';
export const GenerarFactura = () => {
  const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };
  return (
    <div className='content'>
      <div className="cajaTablaVista">
        <h3>Generar Factura</h3>
        <div className="contentVistaFactura">
        <PickList source={source} target={target} onChange={onChange}  filter filterBy="name" breakpoint="1400px"
    sourceHeader="Productos" targetHeader="Seleccionados" sourceStyle={{ height: '30rem' }} targetStyle={{ height: '30rem' }}
    sourceFilterPlaceholder="Buscar Producto" targetFilterPlaceholder="Buscar Producto" />
          </div>



      </div>




    </div>
  )
}
