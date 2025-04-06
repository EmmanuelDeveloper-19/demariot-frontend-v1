import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./auth/login";
import { ProtectedRoutes } from "./services/ProtectedRoute";
import { Home } from "./pages/home";
import { Layout } from "./layout/layout";
import { ProfileInfo } from "./pages/settings/profile-info";

import { UserList } from "./pages/users/UserList";
//import { UserEdit } from "./pages/users/UserEdit";
import { UserCreate } from "./pages/users/UserCreate";
import { UserDetail } from "./pages/users/UserDetail";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoutes allowedRoles={["admin", "user"]} />}>
          <Route element={<Layout/>}>
          <Route path="home" element={<Home/>}/>
          <Route path="profile-info" element={<ProfileInfo/>}/>
          </Route>
        </Route>

        <Route path="/dashboard" element={<ProtectedRoutes allowedRoles={["admin"]}/>}>
          <Route element={<Layout/>}>
          <Route path="usuarios" element={<UserList/>}/>
          <Route path="agregarUsuario" element={<UserCreate/>}/>
          <Route path="usuarioInfo/:id" element={<UserDetail/>}/></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;