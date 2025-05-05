import { getPhSensorData } from "../../services/sensores"
import React, { useEffect, useState } from "react";

export const PhData = () => {
    const [phData, setPhData] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await getPhSensorData();
                if (response.success) {
                    setPhData(response.data.phSensor);
                } else {
                    console.error("Error en la respuesta:", response.error);
                }
            } catch (error) {
                console.error("Error al obtener los datos del sensor:", error);
            }
        };

        obtenerDatos(); // ← ¡Aquí la llamada!
    }, []);

    const ultimo = phData.at(-1);
    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-start">
            <p className="text-title text-gray">Nivel de ph: </p>
            {
                ultimo && (
                    <p className="text-title text-bold text-primary">{ultimo.values}</p>
                )
            }
            </div>
        </>
    )

}