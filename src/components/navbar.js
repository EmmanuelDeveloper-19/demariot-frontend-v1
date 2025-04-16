import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { useRef, useState, useEffect, useContext } from "react";
import nouserimage from "../assets/no_user_image.png";
import { ThemeContext } from "../context/DarkModeContext";
const API_BASE_URL = process.env.REACT_APP_FOTOS;

export const Navbar = ({ toggleSidebar, isOpen }) => {
    const { currentUser, logout, obtenerMensajes } = useAuth();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [mensajes, setMensajes] = useState([]);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const fetchMensajes = async () => {
        if (!currentUser) return;
        const res = await obtenerMensajes(currentUser._id);
        if (res.success) {
            const mensajesRecibidos = res.mensajes.filter(
                msg => msg.id_destinatario === currentUser._id
            );
            setMensajes(mensajesRecibidos);
        }
    };


    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.log("error al serrar sesión");
        }
    };

    const notificationRef = useRef(null);
    const settingsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }
            if (
                settingsRef.current &&
                !settingsRef.current.contains(event.target)
            ) {
                setShowSettings(false);
            }
        };

        // Lógica para obtener mensajes con intervalo
        fetchMensajes();
        const interval = setInterval(fetchMensajes, 3000);

        // Lógica para cerrar dropdowns al hacer clic fuera
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            clearInterval(interval);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [currentUser]);


    const unreadCount = mensajes.filter(msg => !msg.leido).length;

    return (
        <header className={`navbar ${!isOpen ? '' : 'collapsed'}`}>
            <button onClick={toggleSidebar} className="btn-icon hamburger-btn">
                <i className="fas fa-bars"></i>
            </button>
            <div className="navbar-content">
                <div className="notification-container">
                    <button className="btn-icon" onClick={toggleTheme}>
                        {theme === 'light' ? (
                            <>
                                <i className="fas fa-moon"></i> 
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sun"></i> 
                            </>
                        )}
                    </button>

                </div>
                <div className="notification-container" ref={notificationRef}>
                    <button
                        className="notification-icon"
                        onClick={() => setShowNotifications(!showNotifications)}
                        aria-label="Notifications"
                    >
                        <i className="fas fa-bell"></i>
                        {unreadCount > 0 && (
                            <span className="notification-badge">{unreadCount}</span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="notification-dropdown">
                            <div className="dropdown-header">
                                <h4>Mensajes Recibidos</h4>
                                {mensajes.length > 0 && (
                                    <button className="mark-all-read">Marcar todo como leído</button>
                                )}
                            </div>

                            {mensajes.length > 0 ? (
                                <ul className="notifications-list">
                                    {mensajes
                                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                        .map((msg) => (
                                            <li key={msg._id} className={msg.leido ? "read" : "unread"}>
                                                <div className="notification-content">
                                                    <p><strong>{msg.nombre_emisor}</strong>: {msg.contenido}</p>
                                                    <span className="notification-time">
                                                        {new Date(msg.createdAt).toLocaleTimeString("es-MX", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </span>
                                                </div>
                                                {!msg.leido && <span className="unread-indicator"></span>}
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                <div className="empty-notifications">
                                    <p>No tienes mensajes</p>
                                </div>
                            )}
                        </div>
                    )}

                </div>
                <div className="user-profile">
                    <div className="user-info">
                        <p className="user-name">{currentUser?.first_name || "Usuario"}</p>
                    </div>

                    <div className="settings-dropdown-container" ref={settingsRef}>
                        <button
                            className="settings-toggle"
                            onClick={() => setShowSettings(!showSettings)}
                            aria-label="User menu"
                        >
                            <div className="user-avatar">
                                {currentUser?.profile_picture ? (
                                    <img
                                        src={`${API_BASE_URL}${currentUser.profile_picture}`}

                                        alt="Foto de perfil"
                                        className="avatar-image"
                                    />
                                ) : (
                                    <img
                                        src={nouserimage}
                                        alt="Foto de perfil por defecto"
                                        className="avatar-image"
                                    />
                                )}
                            </div>
                        </button>

                        {showSettings && (
                            <div className="settings-dropdown">
                                <ul className="settings-menu">
                                    <li>
                                        <Link to="profile-info" className="menu-item">
                                            <i className="fas fa-user"></i>
                                            <span>Mi Perfil</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/settings" className="menu-item">
                                            <i className="fas fa-cogs"></i>
                                            <span>Configuración</span>
                                        </Link>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <button onClick={handleLogout} className="menu-item logout-btn">
                                            <i className="fas fa-sign-out-alt"></i>
                                            <span>Cerrar Sesión</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}