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
            <Sidebar toggleSidebar={()=> setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen}/>
            <div className={`main-content ${sidebarOpen ? '': 'collapsed'}`}>
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)}/>
                <main className="content">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};
