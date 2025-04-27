import { useState } from "react";
import {useAuth} from "../context/AuthContext";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";


export const ResetPassword = () => {
    const {recoveryPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await recoveryPassword(email);
        if (response?.success) {
            navigate("/mensaje")
        }
        else {
            setError("Ese correo no existe chaval");
        }
    };


    return (
        <div className="login-container">
            <div className="container-left">
                <div className="form-container">
                    <h2 className="titulo">Recuperar contraseña</h2>
                    <p className="textos">Si olvidaste tu contraseña, ingresa tu correo electrónico para generar una nueva contraseña, procura actualizarla lo antes posible.</p>
                    <form onSubmit={handleResetPassword}>
                        <div className="form-group">
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
                        </div>
                        {error && <span className="error-message">{error}</span>}
                        <br />
                        <button type="submit">Recuperar contraseña</button>
                    </form>
                </div>
            </div>
            <div className="container-right">
                <img src={logo} alt="Logo" />
                <h1>Elyceg</h1>
                <p>Desarrollo de software empresarial a la medida</p>
            </div>
        </div>
    )
}

export const Mensaje = () => {
    const navigate = useNavigate();

    const returnLogin = async (e) => {
        e.preventDefault();
        navigate("/login");

    }
    return (
        <div className="login-container">
            <div className="container-left">
            <div className="form-container">
                <h1>Revisa tu correo electrónico</h1>
                <p>
                    Te hemos enviado una nueva contraseña a tu correo. Asegúrate de cambiarla por una personalizada lo antes posible para mantener tu cuenta segura.
                </p>

                <button onClick={returnLogin} className="return">
                    Volver al Inicio de Sesión
                </button>
            </div>
            </div>
            <div className="container-right">
                <img src={logo} alt="Logo" />
                <h1>Elyceg</h1>
                <p>Desarrollo de software empresarial a la medida</p>
            </div>
        </div>

    )
}