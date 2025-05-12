import React, { useEffect, useState } from "react";
import { getTurbidezSensorData } from "../../services/sensores";

export const TurbidezData = () => {
    const [turbidezData, setTurbidezData] = useState([]);

    useEffect(()=> {
        const obtenerDatos = async () => {
            try {
                const response = await getTurbidezSensorData();
                if (response.success) {
                    setTurbidezData(response.data.turbitySensor);
                } else {
                    console.error("Error");
                }
            } catch (error){
                console.error("Error al obtener los datos.");
            }
        };
        obtenerDatos();
    }, []);

    const ultimo = turbidezData.at(-1);
    return (
        <div className="d-flex flex-column justify-content-center align-items-start">
            <p className="text-subtitle text-primary">Turbidez</p>
            {ultimo && (
                <p className="text-title text-primary text-bold">{ultimo.values}</p>
            )}
        </div>
    )
}