import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"

export const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
    
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit">Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}