import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_FOTOS;


// COMPONENTE LISTA DE CHATS
export const Mensajes = () => {
    const { getUsers, currentUser, obtenerMensajes } = useAuth();
    const [users, setUsers] = useState([]);
    const [mensajes, setMensajes] = useState([]);

    const contarNoLeidos = (userId) => {
        return mensajes.filter(
            msg =>
                msg.id_emisor === userId &&
                msg.id_destinatario === currentUser._id &&
                !msg.leido // o !msg.visto dependiendo de cómo lo hayas llamado
        ).length;
    };


    const fetchData = async () => {
        if (!currentUser) return;

        const resUsuarios = await getUsers();
        const resMensajes = await obtenerMensajes(currentUser._id);

        if (resUsuarios.success && resMensajes.success) {
            const otrosUsuarios = resUsuarios.users.filter(
                user => user._id !== currentUser._id
            );
            setUsers(otrosUsuarios);
            setMensajes(resMensajes.mensajes);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, [currentUser]);

    const obtenerUltimoMensaje = (userId) => {
        const mensajesFiltrados = mensajes.filter(
            msg =>
                (msg.id_emisor === currentUser._id && msg.id_destinatario === userId) ||
                (msg.id_destinatario === currentUser._id && msg.id_emisor === userId)
        );
        if (mensajesFiltrados.length === 0) return null;
        return mensajesFiltrados.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    };

    return (
        <div className="container">
            <h1>Chats</h1>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {users.map((user) => {
                    const ultimoMensaje = obtenerUltimoMensaje(user._id);
                    const esNuestro = ultimoMensaje?.id_emisor === currentUser._id;

                    return (
                        <li key={user._id} style={{ marginBottom: "1rem" }}>
                            <Link
                                to={`/dashboard/chat/${user._id}`}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    textDecoration: "none",
                                    color: "inherit",
                                    border: "1px solid #ccc",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <img
                                    src={
                                        user.profile_picture
                                            ? `${API_BASE_URL}${user.profile_picture}`
                                            : "https://via.placeholder.com/40"
                                    }
                                    alt="Perfil"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginRight: "10px",
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: "bold" }}>{user.first_name}</div>
                                    {ultimoMensaje ? (
                                        <div
                                            style={{
                                                fontSize: "0.9rem",
                                                color: "#555",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "6px",
                                            }}
                                        >
                                            {esNuestro ? (
                                                <i
                                                    className="fas fa-check-double"
                                                    style={{
                                                        fontSize: "0.8rem",
                                                        color: ultimoMensaje.leido ? "#4fc3f7" : "#999" // Azul si fue leído, gris si no
                                                    }}
                                                />
                                            ) : contarNoLeidos(user._id) > 0 && (
                                                <div
                                                    style={{
                                                        backgroundColor: "#25D366",
                                                        color: "#fff",
                                                        borderRadius: "999px",
                                                        padding: "2px 6px",
                                                        fontSize: "0.75rem",
                                                        minWidth: "20px",
                                                        textAlign: "center",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {contarNoLeidos(user._id)}
                                                </div>
                                            )}

                                            <span>{ultimoMensaje.contenido}</span>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: "0.9rem", color: "#999" }}>
                                            No hay mensajes aún
                                        </div>
                                    )}
                                </div>
                                {ultimoMensaje && (
                                    <div
                                        style={{
                                            fontSize: "0.75rem",
                                            color: "#888",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        {new Date(ultimoMensaje.createdAt).toLocaleDateString("es-MX", {
                                            day: "2-digit",
                                            month: "short",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

// COMPONENTE DE CHAT INDIVIDUAL
export const Chat = () => {
    const { id } = useParams();
    const { getUserById, obtenerMensajes, currentUser, crearMensaje } = useAuth();
    const [user, setUser] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);
    const [enviando, setEnviando] = useState(false);
    const [imagen, setImagen] = useState(null);
    const chatRef = useRef(null);

    const fetchUser = async () => {
        const { success, user } = await getUserById(id);
        if (success) setUser(user);
    };

    const fetchMensajes = async () => {
        const { success, mensajes } = await obtenerMensajes(currentUser._id);
        if (success) {
            const mensajesFiltrados = mensajes.filter(
                m =>
                    (m.id_emisor === currentUser._id && m.id_destinatario === id) ||
                    (m.id_destinatario === currentUser._id && m.id_emisor === id)
            );
            setMensajes(mensajesFiltrados);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    useEffect(() => {
        fetchMensajes();
        const interval = setInterval(fetchMensajes, 3000);
        return () => clearInterval(interval);
    }, [id]);

    const handleEnviar = async () => {
        if (!mensaje.trim() && !imagen) return;

        setEnviando(true);

        const formData = new FormData();
        formData.append("id_emisor", currentUser._id);
        formData.append("id_destinatario", user._id);
        if (mensaje.trim()) formData.append("contenido", mensaje);
        if (imagen) formData.append("imagen", imagen);

        const result = await crearMensaje(formData);

        if (result.success) {
            setMensaje("");
            setImagen(null);
            await fetchMensajes();
            scrollToBottom();
        } else {
            console.error("Error al enviar mensaje:", result.error);
        }

        setEnviando(false);
    };

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [mensajes]);

    if (!user) return <div>Cargando...</div>;

    return (
        <div className="container">
            <h2>Chat con {user.first_name}</h2>
            <div
                ref={chatRef}
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    height: "400px",
                    overflowY: "auto",
                    marginBottom: "1rem",
                    backgroundColor: "#f9f9f9",
                }}
            >
                {mensajes.map((msg, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            justifyContent: msg.id_emisor === currentUser._id ? "flex-end" : "flex-start",
                            marginBottom: "10px",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: msg.id_emisor === currentUser._id ? "#dcf8c6" : "#fff",
                                padding: "8px 12px",
                                borderRadius: "16px",
                                maxWidth: "60%",
                                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                                wordBreak: "break-word",
                            }}
                        >
                            {/* Texto del mensaje, si lo hay */}
                            {msg.contenido && <div>{msg.contenido}</div>}

                            {/* Imagen si existe */}
                            {msg.imagen && (
                                <img
                                    src={`${API_BASE_URL}${msg.imagen}`}
                                    alt="imagen adjunta"
                                    style={{
                                        marginTop: "8px",
                                        maxWidth: "50%",
                                        borderRadius: "12px",
                                    }}
                                />
                            )}

                            <div style={{ fontSize: "0.75rem", color: "#888", textAlign: "right", marginTop: "4px" }}>
                                {new Date(msg.createdAt).toLocaleTimeString("es-MX", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <input
                    type="text"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "20px",
                        border: "1px solid #ccc",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleEnviar();
                    }}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImagen(e.target.files[0])}
                />
                <button
                    onClick={handleEnviar}
                    disabled={enviando}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "20px",
                        backgroundColor: "#4fc3f7",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};
