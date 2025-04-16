import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useUsers = () => {
    const { getUsers, currentUser } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const { success, users } = await getUsers();
            if (success) {
                const filtered = users.filter(user => user._id !== currentUser?._id);
                setUsers(filtered);
            }
        };
        fetchUsers();
    }, [getUsers, currentUser]);    

    return { users, setUsers };
};
