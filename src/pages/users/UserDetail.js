import { useParams } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export const UserDetail = () => 
{
    const {id} = useParams();
    const { getUserById} = useAuth();
    const [ user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const {success, user} = await getUserById(id);
            if (success)
            {
                setUser(user);
            }
        };
        fetchUser();
    }, [id, getUserById]);

    if (!user) 
    {
        return <div>Cargando..</div>
    }

    return (
        <div className='container'>
            <h2>Detalles del Usuario</h2>
            <div>
                <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Teléfono:</strong> {user.phone}</p>

                {/* Agrega más campos si es necesario */}
            </div>
        </div>
    );

}