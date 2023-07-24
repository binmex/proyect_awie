import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const VistaTabla = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://reqres.in/api/users?page=2').then((res)=>res.json()).then(resultado=>{
            setProducts(resultado.data);
        },(error)=>{
            alert(error)
        })
    }, []);
    return (
        <div className="cardTableView">
            <DataTable value={products} tableStyle={{ minWidth: '40rem' }}>
                <Column field="id" header="id"></Column>
                <Column field="first_name" header="nombre"></Column>
                <Column field="last_name" header="apellido"></Column>
                <Column field="email" header="email"></Column>
            </DataTable>
        </div>
    );
}