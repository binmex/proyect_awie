
import React, { useState} from 'react';
import { PickList } from 'primereact/picklist';
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
export const GenerarFactura = () => {
  const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    };
    const itemTemplate = (product) => {
      return (
        <div className="product-item">
          <div>{product.name}</div>
          <input type="number" value={product.quantity} onChange={(e) => onQuantityChange(e, product)} />
        </div>
      );
    };
    const onQuantityChange = (event, product) => {
      const updatedTarget = [...target];
      const index = updatedTarget.findIndex((p) => p.id === product.id);
      updatedTarget[index].quantity = parseInt(event.target.value);
      setTarget(updatedTarget);
    };
  return (
    <div className='content'>
      <div className="cajaTablaVista">
        <h3>Generar Factura</h3>
        <div className="contentVistaFactura">
        <PickList source={source} target={target} onChange={onChange}  filter filterBy="name" breakpoint="1400px"
    sourceHeader="Productos" targetHeader="Seleccionados" sourceStyle={{ height: '30rem' }} targetStyle={{ height: '30rem' }}
    sourceFilterPlaceholder="Buscar Producto" targetFilterPlaceholder="Buscar Producto" itemTemplate={itemTemplate} />
    </div>
    <div className="ImputsGenerar">
  <div className="inputWrapper">
    <label style={{ fontWeight: 'bold' }}>Pago:</label>
    <InputNumber inputId="integeronly" />
    <label style={{ fontWeight: 'bold' }}> Total: XXXX</label>
    <label style={{ fontWeight: 'bold' }}>Cambio: XXXXX</label>
  </div>
  <Button label="Pagar" severity="success" />
</div>



      </div>




    </div>
  )
}
