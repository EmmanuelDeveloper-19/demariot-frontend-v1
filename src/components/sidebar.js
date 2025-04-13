import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { ThemeContext } from "../context/DarkModeContext";

export const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { currentUser } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
            <div className="logo">
                <img className="logo" src={logo} alt="logo" />
                <h1 style={{ "color": "white" }}>Demariot</h1>
                <button onClick={toggleSidebar} className="hamburger-btn2">
                    <i className="fas fa-bars"></i>
                </button>
            </div>


            <div className="sidebar-content">
                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <ul className="nav-list">
                            <li>
                                <Link to="/dashboard/home">
                                    <i className="fas fa-home" title="Inicio"></i>
                                    <p>Inicio</p>
                                </Link>
                            </li>

                            {currentUser?.role === "admin" && (
                                <li title="Ver usuarios">
                                    <Link to="/dashboard/usuarios" >
                                        <i className="fas fa-users" ></i>
                                        <p>Usuarios</p>
                                    </Link>
                                </li>
                            )}
                            <li title="Ver mapa en tiempo real">
                                <Link to="/dashboard/mapa">
                                    <i className="fas fa-map"></i>
                                    <p>Mapa en tiempo real</p>
                                </Link>
                            </li>

                            <li title="Ver predicciones">
                                <Link to="/dashboard/predicciones">
                                    <i className="fas fa-area-chart" />
                                    <p>Predicciones</p>
                                </Link>
                            </li>

                            <li title="Ver el historial ">
                                <Link to="/dashboard/historial">
                                    <i className="fas fa-history" />
                                    <p>Historial</p>
                                </Link>
                            </li>

                            <li title="Prototipo">
                                <Link to="/dashboard/prototipo">
                                    <i className="fas fa-ship" />
                                    <p>Gestión del prototipo</p>
                                </Link>
                            </li>

                            <li title="Historial de alertas">
                                <Link to="/dashboard/alertHistorial">
                                    <i className="fas fa-exclamation-triangle" />
                                    <p>Historial de alertas</p>
                                </Link>
                            </li>

                            {currentUser?.role === "admin" && (
                                <li title="Ver logs ">
                                    <Link to="/dashboard/log">
                                        <i className="fas fa-cogs" />
                                        <p>Logs</p>
                                    </Link>
                                </li>
                            )}
                            <li title="Ver logs ">
                                <Link to="/dashboard/mensajes">
                                    <i className="fas fa-message" />
                                    <p>Mensajes</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <button onClick={toggleTheme}>
                    Cambiar a modo {theme === 'light' ? 'oscuro' : 'claro'}
                </button>
            </div>
        </aside>
    );
};
