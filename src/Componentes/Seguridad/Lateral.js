import React from 'react'

export const Lateral = () => {
  return (
    <aside className="lateral">
        <div className='box-button'>
            <h3>INVENTARIO</h3>
            <ul>
                <li>
                    <a href='/#'>Agregar</a>
                </li>
                <li>
                    <a href='/#'>Modificar</a>
                </li>
                <li>
                    <a href='/#'>Eliminar</a>
                </li>
                <li>
                    <a href='/#'>Consultar</a>
                </li>
            </ul>
        </div>
        <div className='box-button'>
                <h3>ESTADISTICAS</h3>
                <ul>
                <li>
                    <a href='/#'>Rotacion</a>
                </li>
                <li>
                    <a href='/#'>Ganancias</a>
                </li>
            </ul>
        </div>
        <div className='box-button'>
            <h3>VENTAS</h3>
            <ul>
                <li>
                    <a href='/#'>Generar</a>
                </li>
                <li>
                    <a href='/#'>Visualizar</a>
                </li>
            </ul>
        </div>
        
    </aside>
  )
}
