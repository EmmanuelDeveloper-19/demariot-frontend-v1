import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useChat = (currentUserId, selectedUserId) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    console.log("Token que se envía:", token); // asegúrate que sí se imprima


    useEffect(() => {
        if (!currentUserId || !selectedUserId) return;

        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/messages/${selectedUserId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessages(response.data.messages);
                setLoading(false);
            } catch (error) {
                console.error("Error cargando mensajes", error);
            }
        };

        fetchMessages();
    }, [currentUserId, selectedUserId]);

    const sendMessage = async (text) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${API_BASE_URL}/messages`,
                {
                    recipientId: selectedUserId,
                    text,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessages((prev) => [...prev, response.data.message]);
        } catch (error) {
            console.error("Error enviando mensaje", error);
        }
    };

    return { messages, sendMessage, loading };
};
