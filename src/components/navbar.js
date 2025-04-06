import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { useRef, useState, useEffect } from "react";
import nouserimage from "../assets/no_user_image.png";


export const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

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

    const notifications = [
        {
            id: 1,
            text: "Se encontro una anomalia",
            time: "Hace 10 minutos",
            read: false
        },
        {
            id: 2,
            text: "Se detecto una anomalia en la zona 3",
            time: "Hace 30 minutos",
            read: true
        }
    ];

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

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(notif => !notif.read).length;

    return (
        <header className="navbar">
            <i className="fas fa-bars"></i>
            <div className="navbar-content">
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
                                <h4>Notificaciones</h4>
                                {notifications.length > 0 && (
                                    <button className="mark-all-read">Marcar todo como leído</button>
                                )}
                            </div>

                            {notifications.length > 0 ? (
                                <ul className="notifications-list">
                                    {notifications.map((notif) => (
                                        <li key={notif.id} className={notif.read ? "read" : "unread"}>
                                            <div className="notification-content">
                                                <p>{notif.text}</p>
                                                <span className="notification-time">{notif.time}</span>
                                            </div>
                                            {!notif.read && <span className="unread-indicator"></span>}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="empty-notifications">
                                    <p>No tienes notificaciones</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="user-profile">
                    <div className="user-avatar">
                        {currentUser?.profile_picture ? (
                            <img
                                src={`http://localhost:8000${currentUser.profile_picture}`}
                                
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

                    <div className="user-info">
                        <p className="user-name">{currentUser?.first_name || "Usuario"}</p>
                    </div>

                    <div className="settings-dropdown-container" ref={settingsRef}>
                        <button
                            className="settings-toggle"
                            onClick={() => setShowSettings(!showSettings)}
                            aria-label="User menu"
                        >
                            <i className="fas fa-chevron-down"></i>
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