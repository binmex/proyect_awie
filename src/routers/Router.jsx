import React from "react";
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Agregar } from "../pages/Agregar";
import Login from "../Componentes/Login";
import { ModificarPage } from "../pages/ModificarPage";
import { Error404 } from "../pages/Error404";
import { EliminarPage } from "../pages/EliminarPage";
import { ConsultarPage } from "../pages/ConsultarPage";

export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/agregar" element={<Agregar/>} />
          <Route path="/modificar" element={<ModificarPage/>} />
          <Route path="/eliminar" element={<EliminarPage/>} />
          <Route path="/consultar" element={<ConsultarPage/>} />
          <Route path="*" element={<Error404/>}/>
        </Routes>
    </BrowserRouter>
  );
};