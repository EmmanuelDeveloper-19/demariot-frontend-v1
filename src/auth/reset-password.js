import { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";


export const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (email === "admin@gmail.com") {
            navigate("/mensaje")
        }
        else {
            setError("Ese correo no existe chaval");
        }
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <div className="form-container">
                    <h1>Recuperar contraseña</h1>
                    <form onSubmit={handleResetPassword}>
                        <label>Correo</label>
                        <div className="input-icon-container">
                            <i className="fas fa-envelope icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Ingresa tu correo electronico"
                            />

                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Recuperar contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export const Mensaje = () => {
    const navigate= useNavigate();

    const returnLogin = async (e) => {
        e.preventDefault();
        navigate("/login");

    }
    return (
        <div className="login-container">
            <div className="mensaje-card">
                <h1>Revisa tu correo electrónico</h1>
                <p>
                    Te hemos enviado una nueva contraseña a tu correo. Asegúrate de cambiarla por una personalizada lo antes posible para mantener tu cuenta segura.
                </p>

                <button onClick={returnLogin} className="return">
                    Volver al Inicio de Sesión
                </button>
            </div>
        </div>

    )
}