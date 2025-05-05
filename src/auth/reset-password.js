import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoar.-02.png";


export const ResetPassword = () => {
    const { recoveryPassword } = useAuth();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await recoveryPassword(email);
            if (response?.success) {
                navigate("/mensaje")
            }
            else {
                setError(response?.error || "El correo no existe");
            }

        } catch (error) {
            setError("Ocurrió un error inesperado");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="text-subtitle text-light text-primary-dark mb-1">Recuperar contraseña</h2>
                <p className="text-body text-primary-dark mb-1">Si olvidaste tu contraseña, ingresa tu correo electrónico para generar una nueva contraseña, procura actualizarla lo antes posible.</p>
                {error && <span className="alert alert-danger">{error}</span>}
                <form className="form" onSubmit={handleResetPassword}>
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
                    <br />
                    <button
                        className="btn btn-primary"
                        disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Cargando...
                            </>
                        ) : (
                            "Enviar correo"
                        )}
                    </button>
                </form>
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
            <div className="login-card">
                <h1 className="text-subtitle text-light text-primary-dark mb-1">Revisa tu correo electrónico</h1>
                <p className="text-body text-primary-dark mb-1">
                    Te hemos enviado una nueva contraseña a tu correo. Asegúrate de cambiarla por una personalizada lo antes posible para mantener tu cuenta segura.
                </p>

                <button onClick={returnLogin} className="btn btn-primary mt-1">
                    Volver al Inicio de Sesión
                </button>
            </div>
        </div>

    )
}