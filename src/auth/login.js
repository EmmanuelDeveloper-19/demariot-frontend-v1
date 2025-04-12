import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

export const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const response = await login(email, password);
        if (response?.success) {
            navigate("/dashboard/home");
        } else {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="form-container">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <label>Email:</label>
                        <div className="input-icon-container">
                            <i className="fas fa-envelope icon" />
                            <input
                                type="email"
                                value={email}
                                required
                                placeholder="Introduce tu correo electrónico"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <label>Contraseña:</label>
                        <div className="input-icon-container">
                            <i className="fas fa-lock icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Ingresa tu contraseña"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Ingresar</button>
                        <div className="forgot-password">
                            <p>¿Olvidaste tu contraseña?</p>
                            <Link className="link" to="/reset-password">Recuperar contraseña</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
