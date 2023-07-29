import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const VistaTabla = () => {
    const [products, setProducts] = useState([]);
    const [totalValueSold, setTotalValueSold] = useState(0);

    useEffect(() => {

        fetch('http://localhost:3001/api/ventas/visualizar').then((res)=>res.json()).then(resultado=>{
            console.log(resultado)
            setProducts(resultado);
        },(error)=>{
            alert(error)
        })
    }, []);

    // Calcular la sumatoria total de la columna "value_sold"
    useEffect(() => {
        const total = products.reduce((acc, item) => acc + item.value_sold, 0);
        setTotalValueSold(total);
    }, [products]);

    return (
        <div className="cardTableView">
            <DataTable value={products} tableStyle={{ minWidth: '40rem' }}>
                <Column field="id_invoice" header="Id Factura"></Column>
                <Column field="product_id" header="producto ID"></Column>
                <Column field="date_of_sell" header="fecha de venta"></Column>
                <Column field="value_sold" header="valor de venta"></Column>
            </DataTable>
            <label >Total: {totalValueSold.toLocaleString('es-ES')}</label>
        </div>
    );
}