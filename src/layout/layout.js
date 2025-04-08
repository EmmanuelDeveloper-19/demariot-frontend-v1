import { Outlet } from "react-router-dom"
import "../styles/global.css";
import "../styles/global.responsive.css";
import { Sidebar } from "../components/sidebar";
import { Navbar } from "../components/navbar";
import { useState } from "react";

export const Layout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return(
        <div className="app-layout">
            <Sidebar isOpen={sidebarOpen}/>
            <div className={`main-content ${sidebarOpen ? '': 'collapsed'}`}>
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
                <main className="content">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

/*

<div className="app-layout">
            <h1>Hola sidebar</h1>
            <main>
            <Outlet/>
            </main>

            <p>{currentUser.first_name}</p>
            <p>{currentUser.last_name}</p>

            <p>{currentUser.email}</p>
            <p>{currentUser.password}</p>
            <p>{currentUser.role}</p>




            <button onCLick={handleLogout}>
                cerrar sesión
            </button>
        </div>
        */