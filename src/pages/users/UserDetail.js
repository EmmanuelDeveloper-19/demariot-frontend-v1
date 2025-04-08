import { useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8000";

export const UserDetail = () => {

    const { id } = useParams();
    const { getUserById } = useAuth();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { success, user } = await getUserById(id);
            if (success) {
                setUser(user);
            }
        };
        fetchUser();
    }, [id, getUserById]);

    if (!user) {
        return <div>Cargando..</div>
    }

    return (
        <div className='container'>
            <header>Información del usuario</header>
            <div className="profile-picture-wrapper">
                <img
                    src={`${API_BASE_URL}${user.profile_picture}`}
                    alt="Imagen de perfil"
                    className="profile-picture" />
            </div>

            <form className="form">
                <h3>Datos de perfil</h3>
                <div className="column">
                    <div className="input-box">
                        <label>Nombre del usuario</label>
                        <input type="text" disabled value={user?.first_name || null} />
                    </div>
                    <div className="input-box">
                        <label>Apellidos</label>
                        <input type="text" disabled value={user?.last_name || null}  />
                    </div>
                </div>

                <div className="column">
                    <div className="input-box">
                        <label>Correo electrónico</label>
                        <input type="email" disabled value={user?.email || null} />
                    </div>
                    <div className="input-box">
                        <label>Teléfono de contacto</label>
                        <input type="text" disabled value={user?.phone || null} />
                    </div>
                </div>

                <div className="column">
                    <div className="input-box">
                        <label>Rol del usuario</label>
                        <input type="text" disabled value={user?.role || null} />
                    </div>
                    <div className="input-box">
                        <label></label>
                    </div>
                </div>

                <h3>Datos de domicilio</h3>
                <div className="column">
                    <div className="input-box">
                        <label>Estado</label>
                        <input type="text" disabled value={user?.address.state || null}></input>
                    </div>
                    <div className="input-box">
                        <label>Municipio</label>
                        <input type="text" disabled value={user?.address.city || null}></input>
                    </div>
                </div>
                <div className="column">
                    <div className="input-box">
                        <label>Calle</label>
                        <input type="text" disabled value={user?.address.street || null}></input>
                    </div>
                    <div className="input-box">
                        <label>Código postal</label>
                        <input type="text" disabled value={user?.address.zip || null}></input>
                    </div>
                </div>

                <h3>Actividad del usuario</h3>
                <div className="input-box">
                    <label>Fecha de creación del usuario</label>
                    <input type="text"disabled value={user?.created_at || null}/>
                </div>

                <div className="input-box">
                    <label>Fecha de útlimo inicio de sesión</label>
                    <input type="text"disabled value={user?.last_login || null}/>
                </div>

                <div className="input-box">
                    <label>Fecha de última actualización de datos del usuario</label>
                    <input type="text"disabled value={user?.updated_at || null}/>
                </div>
            </form>

        </div>
    );

}


/*
            <div>
                <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.phone}</p>

                </div>*/