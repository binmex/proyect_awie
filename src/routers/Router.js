import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { BarraNav } from "../Componentes/Seguridad/BarraNav";
import { Lateral } from "../Componentes/Seguridad/Lateral";
import { Inicio } from "../Componentes/Seguridad/Inicio";

export const Router = () => {
  return (
    <BrowserRouter>
      {/**Navegation*/}
      <BarraNav />

      <div className="layout">
        {/**Rutas */}
        <Lateral />
        {/**Contenido*/}
        <Routes>
          <Route path="/" element={<Navigate to={"/inicio"} />} />
          <Route path="/inicio" element={<Inicio />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
