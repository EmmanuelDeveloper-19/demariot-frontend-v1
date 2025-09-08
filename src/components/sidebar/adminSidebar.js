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
                                    <p>Mapa (Próximamente)</p>
                                </Link>
                            </li>
                            <li title="Predicciones de Metales pesados">
                                <Link to="predicciones">
                                    <i className="fa-solid fa-chart-line"></i>
                                    <p>Proyecciones (Próximamente)</p>
                                </Link>
                            </li>

                            <li title="Información de Metales pesados registrados">
                                <Link to="registro-metales">
                                    <i className="fa-solid fa-atom"></i>
                                    <p>Registro de metales</p>
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

                            <li title="Historial de alertas">
                                <Link to="about-information">
                                    <i className="fas fa-lightbulb" />
                                    <p>Información relevante</p>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>

        </aside>
    )

}