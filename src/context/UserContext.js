import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const UserProvider = ({ children }) => {
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


    const createUser = async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/create-user`, userData);
            return { success: true, user: response.userData};
        } catch(error){
            return { success: false, error};
        }
    }
    
    const createMultipleUsers = async (userData) => {
        try{
            const response = await axios.post(`${API_BASE_URL}/create-users`, userData,{
                headers: {'Content-Type': 'application/json'}
            });
            return {success:true, users: response.data.users};
        } catch(error){
            return {success: false, error};
        }
    }

    const getUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-users`);
            return { success: true, users: response.data.users };
        }
        catch (error) {
            return { success: false, error };
        }
    }

    const getUserById = async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-user/${userId}`);
            return { success: true, user: response.data.user };
        } catch (error){
            return {success:false, error};
        }
    }

    const updateUserRol = async (userId, role) => {
        try{
            const response = await axios.put(`${API_BASE_URL}/update-user/${userId}`, {role});
            return {success:true, user:response.data.user};
        } catch(error){
            return {success:false, error};
        }
    }

    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/delete-users/${userId}`);
            return { success:true, message: response.data.message};
        } catch (error) {
            return { success: false, error};
        }
    }


    const value = {
        createUser,
        createMultipleUsers,
        currentUser,
        getUsers,
        getUserById,
        updateUserRol,
        deleteUser
    }

    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
};

export const Usuarios = () => useContext(UserContext);