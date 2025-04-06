import React, {useEffect, useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const UserList = () =>
{
    const {getUsers} = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () =>{
            const { success, users} = await getUsers();
            if (success)
            {
                setUsers(users);
            }
        };
        fetchUsers();
    }, [getUsers]);

    return (
        <div className='container'>
            <h2>Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.first_name}{user.last_name}
                        <Link to={`/dashboard/usuarioInfo/${user._id}`}>
                            <button>Ver detalles</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}