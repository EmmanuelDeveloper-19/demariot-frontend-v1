import { Link } from "react-router-dom";
import logo from "../../assets/logo-compreso-v1.png";

export const AdminSidebar = ({ isOpen, toggleSidebar }) => {

    return (
        <aside className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
            <div className="logo">
                <img className="logo-small" src={logo} alt="Logo de la empresa" />
                <h1 className="text-white">Demariot</h1>
                <button onClick={toggleSidebar} className="btn-icon text-white only-mobile">
                    <i className="fas fa-bars" />
                </button>
            </div>

            <div className="sidebar-content">
                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <ul className="nav-list">
                            <li>
                                <Link to="home">
                                    <i className="fas fa-home"></i>
                                    <p>Inicio</p>
                                </Link>
                            </li>
                            <li title="Ver usuarios">
                                <Link to="usuarios" >
                                    <i className="fas fa-users" ></i>
                                    <p>Usuarios</p>
                                </Link>
                            </li>
                            <li title="Ver mapa en tiempo real">
                                <Link to="maps">
                                    <i className="fas fa-map"></i>
                                    <p>Mapa de contaminación</p>
                                </Link>
                            </li>

                            <li title="Ver predicciones">
                                <Link to="predicciones">
                                    <i className="fas fa-area-chart" />
                                    <p>Datos de los metales</p>
                                </Link>
                            </li>

                            <li title="Ver el historial ">
                                <Link to="historial">
                                    <i className="fas fa-history" />
                                    <p>Datos de los sensores</p>
                                </Link>
                            </li>

                            <li title="Prototipo">
                                <Link to="prototipo">
                                    <i className="fas fa-ship" />
                                    <p>Gestión del prototipo</p>
                                </Link>
                            </li>

                            <li title="Historial de alertas">
                                <Link to="alertHistorial">
                                    <i className="fas fa-exclamation-triangle" />
                                    <p>Historial de alertas</p>
                                </Link>
                            </li>
                            <li title="Ver logs ">
                                <Link to="log">
                                    <i className="fas fa-cogs" />
                                    <p>Logs</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        </aside>
    )

}