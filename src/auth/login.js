import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { roleRedirects } from "../utils/roleRedirects";
import logo from "../assets/logoar.-02.png";

export const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            const response = await login(email, password);
            if (response?.success) {
                setMessage("Inicio de sesión exitoso");

                setTimeout(() => {
                    const redirectPath = roleRedirects[response.user.role];
                    navigate(redirectPath);
                }, 500);
            } else {
                setError("Usuario o contraseña incorrectos");
            }
        } catch (error) {
            setError("Ocurrió un error inesperado");
        }
    };

    return (
        <div className="login-content">
            <div className="content-left">

                <form className="form" onSubmit={handleLogin}>

                    <h1 className="text-primary-dark mt-1">Iniciar Sesión</h1>
                    {error && <p className="alert alert-danger">{error}</p>}
                    {message && <p className="alert alert-success">{message}</p>}
                    <div className="form-group">
                        <label>Correo electrónico: </label>
                        <div className="input-icon-container">
                            <i className="fas fa-envelope icon" />
                            <input
                                type="email"
                                value={email}
                                required
                                placeholder="Introduce tu correo electrónico"
                                onChange={(e) => setEmail(e.target.value)}
                                className={error ? "input-error" : ""} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Contraseña: </label>
                        <div className="input-icon-container">
                            <i className="fas fa-lock icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Ingresa tu contraseña"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className={error ? "input-error" : ""}
                            />
                            <i
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-end gap">
                        <Link className="link" to="/reset-password">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <br />
                    <button className="btn btn-primary">
                        Iniciar sesión
                    </button>
                </form>
            </div>
            <div className="content-right">
                <img className="logo" src={logo}  loading="lazy"></img>
            </div>
        </div>
    );
};

/*
        <div className="login-container">
            <div className="login-card">
                <h1 className="text-subtitle text-light">Iniciar Sesión</h1>
                {error && <p className="alert alert-danger">{error}</p>}
                {message && <p className="alert alert-success">{message}</p>}

                <form className="form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Correo electrónico: </label>
                        <div className="input-icon-container">
                            <i className="fas fa-envelope icon" />
                            <input
                                type="email"
                                value={email}
                                required
                                placeholder="Introduce tu correo electrónico"
                                onChange={(e) => setEmail(e.target.value)}
                                className={error ? "input-error": ""} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Contraseña: </label>
                        <div className="input-icon-container">
                            <i className="fas fa-lock icon" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Ingresa tu contraseña"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className={error ? "input-error": ""}
                            />
                            <i
                                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-end gap">
                        <Link className="text-primary link" to="/reset-password">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <br />
                    <button className="btn btn-primary">
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
*/


/*
                <picture >
                    <source 
                    media="(min-width: 700px)"
                    srcSet={logo}/>
                    <img className="logo-small" src={logo}></img>
                </picture>


        <div className="login-container">
            <div className="row row-reverse">
                <div className="col-md-6 bg-content content-center content-left">
                    <div className="form-container">
                        <h1 className="text-subtitle text-primary">Demariot</h1>
                        <h1 className="text-title text-primary mt-1">Iniciar Sesión</h1>

                        <p className="text-heading text-primary mt-1 hide-mobile">Bienvenido de nuevo!, ingresa tus credenciales para acceder a la aplicación.</p>

                        <form onSubmit={handleLogin}>
                            <div className="form-group mt-1">
                                <label>Correo electrónico: </label>
                                <div className="input-icon-container">
                                    <i className="fas fa-envelope icon" />
                                    <input
                                        type="email"
                                        value={email}
                                        required
                                        placeholder="Introduce tu correo electrónico"
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Contraseña: </label>
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
                            </div>
                            <div className="row justify-content-end gap">
                                <p className="text-primary">¿Olvidaste tu contraseña?</p>
                                <Link className="text-primary-900" to="/reset-password">Recuperar contraseña</Link>
                            </div>
                            {error && <p className="btn error-message">{error}</p>}
                            <br />
                            <button
                                className="btn btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Cargando...
                                    </>
                                ) : (
                                    "Iniciar sesión"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 content-center bg-primary-dark content-right">
                    <img src={logo} alt="Logo" className="logo-big" />
                </div>
            </div>
        </div>
       

        <div className="login-container">
            <div className="login-card">
                <div className="form-container">
                    <h1>Inicio de sesión</h1>
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
                        <button className="btn btn-primary" type="submit">Ingresar</button>
                        <div className="forgot-password">
                            <p>¿Olvidaste tu contraseña?</p>
                            <Link className="link" to="/reset-password">Recuperar contraseña</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    */
