import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "./auth/login";
import { Home } from "./pages/home/home";
import { ProfileInfo } from "./pages/settings/profile-info";
import { UserList} from "./pages/users/UserList"
import { UserCreate} from "./pages/users/UserCreate";
import { UserDetail} from "./pages/users/UserDetail";
import { Mensaje, ResetPassword } from "./auth/reset-password";
import { Mapa } from "./pages/mapa/mapa";
import { Prediction } from "./pages/pediction/prediction";
import { Historial } from "./pages/history/historial";
import { Prototype } from "./pages/proto/prototipo";
import { HistorialAlertas } from "./pages/alertHistory/alertHistory";
import { Logs } from "./pages/logs/logs";
import { MapaContaminacion } from "./pages/mapa/maps";
import { AdminLayout } from "./layout/adminLayout";
import { UserLayout } from "./layout/userLayout";
import { ProtectedUserRoute } from "./services/protectedRoutes/ProtectedUserRoute";
import { ProtectedAdminRoute } from "./services/protectedRoutes/ProtectedAdminRoute";
import { Error404 } from "./pages/error/404";
import { Prototype1 } from "./pages/proto/prototype";
import "./styles/global.css";
import "./styles/global.responsive.css";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/mensaje" element={<Mensaje />} />
        {/* User Routes */}
        <Route
          path="/dashboard-user"
          element={
            <ProtectedUserRoute>
              <UserLayout />
            </ProtectedUserRoute>
          }
        >
          <Route path="" element={<Navigate to="home" replace />} />
          <Route path="*" element={<Error404 />} />
          <Route path="home" element={<Home />} />
          <Route path="profile-info" element={<ProfileInfo />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="predicciones" element={<Prediction />} />
          <Route path="historial" element={<Historial />} />
          <Route path="prototipo" element={<Prototype />} />
          <Route path="alertHistorial" element={<HistorialAlertas />} />
          <Route path="maps" element={<MapaContaminacion />} />
          <Route path="mensajes" element={<MapaContaminacion />} />
          <Route path="prototype" element={<Prototype1/>}/>
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard-admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }>
          <Route path="" element={<Navigate to="home" replace />} />
          <Route path="*" element={<Error404 />} />
          <Route path="home" element={<Home />} />
          <Route path="profile-info" element={<ProfileInfo />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="predicciones" element={<Prediction />} />
          <Route path="historial" element={<Historial />} />
          <Route path="prototipo" element={<Prototype />} />
          <Route path="alertHistorial" element={<HistorialAlertas />} />
          <Route path="maps" element={<MapaContaminacion />} />
          <Route path="usuarios" element={<UserList />} />
          <Route path="agregarUsuario" element={<UserCreate />} />
          <Route path="usuarioInfo/:id" element={<UserDetail />} />
          <Route path="log" element={<Logs />} />
          <Route path="prototype" element={<Prototype1/>}/>

        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;