import React, { useState, useEffect } from "react";
import { PickList } from "primereact/picklist";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import axios from "axios";

export const GenerarFactura = () => {
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [total, setTotal] = useState(0);
  const [value3, setValue3] = useState(1);
  const [quantities, setQuantities] = useState({});



  useEffect(() => {
    fetch("http://localhost:4000/api/ventas/getproductos")
      .then((res) => res.json())
      .then(
        (resultado) => {
          setSource(resultado);
        },
        (error) => {
          alert(error);
        }
      );
  }, []);

  const onChange = (event) => {
    setSource(event.source);
    setTarget(event.target);

    const selectedItemsTotal = event.target.reduce(
      (acc, item) => acc + item.selling_price * (quantities[item.id] || 1),
      0
    );
    setTotal(selectedItemsTotal);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  const simularPago = ()=>{
    axios.post("http://localhost:4000/api/ventas/addventa", target).then((res) => {
        alert("Venta añadida");
      }).catch((error)=>console.error(error));
  }

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name_product}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>comestibles</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.selling_price}</span>
        <InputNumber
          value={quantities[item.id_producto] || 1}
          onValueChange={(e) => handleQuantityChange(item.id, e.value)}
          mode="decimal"
          showButtons
          min={1}
          max={100}
        />
      </div>
    );
  };
  

  return (
    <div className="content">
      <div className="cajaTablaVista">
        <h3>Generar Factura</h3>
        <div className="contentVistaFactura">
          <div className="card">
            <PickList
              source={source}
              target={target}
              onChange={onChange}
              itemTemplate={itemTemplate}
              filter
              filterBy="name_product"
              breakpoint="1400px"
              sourceHeader="Available"
              targetHeader="Selected"
              sourceStyle={{ height: "30rem" }}
              targetStyle={{ height: "30rem" }}
              sourceFilterPlaceholder="Search by name"
              targetFilterPlaceholder="Search by name"
            />
          </div>
        </div>
        <div className="ImputsGenerar">
          <div className="inputWrapper">
            <label style={{ fontWeight: "bold" }}>Pago:</label>
            <InputNumber inputId="integeronly" />
            <label style={{ fontWeight: "bold" }}> Total: ${total}</label>
            <label style={{ fontWeight: "bold" }}>Cambio: XXXXX</label>
          </div>
          <Button label="Pagar" severity="success" onClick={()=>simularPago()}/>
        </div>
      </div>
    </div>
  );
};
