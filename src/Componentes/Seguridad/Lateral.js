import React from "react";
import { NavLink } from "react-router-dom";

export const Lateral = () => {
  return (
    <aside className="lateral">
      <div className="box-button">
        <h3>INVENTARIO</h3>
        <ul>
          <li>
            <NavLink
              to={"/inicio"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              Agregar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/inicio"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              Modificar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/inicio"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              Eliminar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/inicio"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              Consultar
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="box-button">
        <h3>ESTADISTICAS</h3>
        <ul>
          <li>
            <NavLink
              to={"/inicio"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              Rotacion
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/inicio"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              Ganancias
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="box-button">
        <h3>VENTAS</h3>
        <ul>
          <li>
            <NavLink
              to={"/inicio"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              Generar
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/inicio"}
              className={({ isActive }) => (isActive === true ? "active" : "")}
            >
              Visualizar
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};
