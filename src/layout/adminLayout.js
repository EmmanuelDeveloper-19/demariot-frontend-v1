import { useState } from "react"
import { Navbar } from "../components/navbar";
import { Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/sidebar/adminSidebar";


export const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="app-layout">
            <AdminSidebar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
            <div className={`main-content ${sidebarOpen ? '' : 'collapsed'}`}>
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="content" onClick={() => {
                    if (window.innerWidth <= 768) {
                        setSidebarOpen(true);
                    }
                }}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}