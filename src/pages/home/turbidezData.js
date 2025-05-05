import { useEffect, useState } from "react";
import { getTurbidezSensorData } from "../../services/sensores";

export const TurbidezData = () => {
    const [turbidezData, setTurbidezData] = useState([]);

    useEffect(()=> {
        const obtenerDatos = async () => {
            try {
                const response = await getTurbidezSensorData();
                if (response.success) {
                    setTurbidezData(response.data.turbidezSensor);
                } else {
                    console.error("Error");
                }
            } catch (error){
                console.error("Error al obtener los datos.");
            }
        };
        obtenerDatos();
    }, []);

    const ultimo = Array.isArray(turbidezData) ? turbidezData.at(-1) : null;

    return (
        <div className="d-flex flex-column justify-content-center align-items-start">
            <p className="text-title text-gray">Nivel de turbidez</p>
            {ultimo && (
                <p className="text-title text-primary text-bold">{ultimo.values}</p>
            )}
        </div>
    )
}