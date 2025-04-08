import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Sidebar = ({ isOpen }) => {
    const { currentUser } = useAuth();

    return (
        <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>

            <div className="sidebar-content">
                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <ul className="nav-list">
                            <li>
                                <Link to="/dashboard/home">
                                    <i className="fas fa-home"></i>
                                    <p>Inicio</p>
                                </Link>
                            </li>

                            {currentUser?.role === "admin" && (
                                <li>
                                    <Link to="/dashboard/usuarios">
                                        <i className="fas fa-users"></i>
                                        <p>Usuarios</p>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};
