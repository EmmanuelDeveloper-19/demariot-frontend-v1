import logo from "../../assets/logo-compreso-v1.png";
import { Link } from "react-router-dom";

export const UserSidebar = ({ isOpen, toggleSidebar }) => {

    return (
        <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
            <div className="logo">
                <img className="logo-small" src={logo} alt="logo" />
                <h1 style={{ "color": "white" }}>Demariot</h1>
                <button onClick={toggleSidebar} className="btn-icon text-white only-mobile ">
                    <i className="fas fa-bars"></i>
                </button>
            </div>


            <div className="sidebar-content">
                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <ul className="nav-list">
                            <li>
                                <Link to="/dashboard-user/home">
                                    <i className="fas fa-home" title="Inicio"></i>
                                    <p>Inicio</p>
                                </Link>
                            </li>

                            <li title="Ver mapa en tiempo real">
                                <Link to="/dashboard-user/maps">
                                    <i className="fas fa-map"></i>
                                    <p>Mapa en tiempo real</p>
                                </Link>
                            </li>

                            <li title="Ver predicciones">
                                <Link to="/dashboard-user/predicciones">
                                    <i className="fas fa-area-chart" />
                                    <p>Predicciones</p>
                                </Link>
                            </li>

                            <li title="Ver el historial ">
                                <Link to="/dashboard-user/historial">
                                    <i className="fas fa-history" />
                                    <p>Historial</p>
                                </Link>
                            </li>

                            <li title="Prototipo">
                                <Link to="/dashboard-user/prototipo">
                                    <i className="fas fa-ship" />
                                    <p>Gestión del prototipo</p>
                                </Link>
                            </li>

                            <li title="Historial de alertas">
                                <Link to="/dashboard-user/alertHistorial">
                                    <i className="fas fa-exclamation-triangle" />
                                    <p>Historial de alertas</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};
