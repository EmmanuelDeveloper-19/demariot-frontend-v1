import { useState } from "react"
import { UserSidebar } from "../components/sidebar/userSidebar";
import { Navbar } from "../components/navbar";
import { Outlet } from "react-router-dom";


export const UserLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="app-layout">
            <UserSidebar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
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