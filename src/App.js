import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./auth/login";
import { ProtectedRoutes } from "./services/ProtectedRoute";
import { Home } from "./pages/home/home";
import { Layout } from "./layout/layout";
import { ProfileInfo } from "./pages/settings/profile-info";

import { UserList } from "./pages/users/UserList";
//import { UserEdit } from "./pages/users/UserEdit";
import { UserCreate } from "./pages/users/UserCreate";
import { UserDetail } from "./pages/users/UserDetail";
import { Mensaje, ResetPassword } from "./auth/reset-password";
import { Mapa } from "./pages/mapa/mapa";
import { Prediction } from "./pages/pediction/prediction";
import { Historial } from "./pages/history/historial";
import { Prototype } from "./pages/proto/prototipo";
import { HistorialAlertas } from "./pages/alertHistory/alertHistory";
import { Logs } from "./pages/logs/logs";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/mensaje" element={<Mensaje/>}/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["admin", "user"]}>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="profile-info" element={<ProfileInfo />} />
          <Route path="mapa" element={<Mapa/>}/>
          <Route path="predicciones" element={<Prediction/>}/>
          <Route path="historial" element={<Historial/>}/>
          <Route path="prototipo" element={<Prototype/>}/>
          <Route path="alertHistorial" element={<HistorialAlertas/>}/>

          {/* Subrutas protegidas SOLO para admin */}
          <Route
            path="usuarios"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <UserList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="agregarUsuario"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <UserCreate />
              </ProtectedRoutes>
            }
          />
          <Route
            path="usuarioInfo/:id"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <UserDetail />
              </ProtectedRoutes>
            }
          />
          <Route 
            path="log" 
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <Logs/>
              </ProtectedRoutes>
            }/>

        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;