import React, { createContext, useContext, useEffect, useState} from "react";
import axios from 'axios';

const AuthContext = createContext();
const API_BASE_URL = "http://localhost:8000/api";

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if(storedUser && token ) 
        {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password ) => {
        try
        {
            const response = await axios.post(`${API_BASE_URL}/login`, {email, password});
            const {token, user} = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { success: true, user};
        }
        catch(error) 
        {
            console.log("Error al loggear", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
        delete axios.defaults.headers.common['Authorization'];
        return true;
    }

    const updateUser = async (userId, updatedData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No se encontró un token de autenticación");
            }
    
            const formData = new FormData();
            for (const key in updatedData) {
                if (key === "profile_picture" && updatedData[key]) {
                    formData.append(key, updatedData[key]);
                } else if (key === "address") {
                    // serializar address como JSON string
                    formData.append("address", JSON.stringify(updatedData.address));
                } else if (updatedData[key]) {
                    formData.append(key, updatedData[key]);
                }
            }
            
            const response = await axios.put(`${API_BASE_URL}/users/${userId}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            const updatedUser = response.data.user;
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setCurrentUser(updatedUser);
    
            return { success: true, user: updatedUser };
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            return { success: false, error };
        }
    };
    

    

    const value = {
        currentUser,
        setCurrentUser,
        login,
        logout,
        updateUser,
        isAuthenticated: !!currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);