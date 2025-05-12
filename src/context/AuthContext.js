import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser && token) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { success: true, user };
        }
        catch (error) {
            return {
                success: false,
                error: "Error al conectar con el servidor"
            };
        }
    };

    const logout = async () => {
        await axios.post(`${API_BASE_URL}/logout`);
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

            const response = await axios.put(`${API_BASE_URL}/updateUser/${userId}`, formData, {
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

    const changePassword = async (userId, currentPassword, newPassword) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${API_BASE_URL}/changePassword/${userId}`,
                {
                    currentPassword,
                    newPassword,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return { success: true, message: response.data.message };
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error.response?.data || error);
            return { success: false, error: error.response?.data?.message || "Error desconocido" };
        }
    };

    const recoveryPassword = async (email) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/recovery-password`, { email });
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message ||
                    error.message ||
                    "Error al conectar con el servidor"
            };
        }
    };

    const getProfilePictureUrl = async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/${userId}/photo`);
            return { success: true, user:response.data };
        } catch(error){
            console.log("Error")
        }
    };
    

    const value = {
        currentUser,
        setCurrentUser,
        login,
        logout,
        updateUser,
        changePassword,
        recoveryPassword,
        getProfilePictureUrl,
        isAuthenticated: !!currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);