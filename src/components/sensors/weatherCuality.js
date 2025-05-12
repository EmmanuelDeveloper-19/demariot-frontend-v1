import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend
} from "recharts";
import React, { useState, useEffect } from "react";
import { getColorimetrySensorData } from "../../services/sensores";

const COLORS = {
  estable: "#2ecc71",     // Verde
  media: "#f1c40f",       // Amarillo
  peligrosa: "#e74c3c"    // Rojo
};

const calcularIndiceCalidad = (datos) => {
  if (!Array.isArray(datos) || datos.length === 0) return 100;

  let totalConcentracion = 0;
  let totalMediciones = 0;

  datos.forEach(entry => {
    totalConcentracion += entry.metals.concentration_mgL;
    totalMediciones++;
  });

  const promedio = totalConcentracion / totalMediciones;

  // Mapeamos el promedio a una escala de 0 a 100 (esto se puede ajustar según umbrales reales)
  const indice = Math.max(0, 100 - promedio * 10); // más concentración = peor calidad

  return parseFloat(indice.toFixed(2));
};

export const WeatherQuality = () => {
  const [indice, setIndice] = useState(100);
  const [nivel, setNivel] = useState("estable");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const res = await getColorimetrySensorData();
        const datos = Array.isArray(res.data)
          ? res.data
          : res.data.colorimetrySensor || [];

        const nuevoIndice = calcularIndiceCalidad(datos);

        let categoria = "estable";
        if (nuevoIndice < 40) categoria = "peligrosa";
        else if (nuevoIndice < 70) categoria = "media";

        setIndice(nuevoIndice);
        setNivel(categoria);
      } catch (error) {
        console.error("Error al cargar calidad del agua", error);
      }
    };

    cargarDatos();
    const interval = setInterval(cargarDatos, 5000);
    return () => clearInterval(interval);
  }, []);

  const pieData = [
    { name: "Calidad del agua", value: indice },
    { name: "Contaminación", value: 100 - indice }
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index === 0 ? COLORS[nivel] : "#bdc3c7"} // gris para la parte sucia
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => `${value.toFixed(2)}%`}
          contentStyle={{
            backgroundColor: "#fff",
            color: "#333",
            borderRadius: "8px",
            border: "none",
          }}
        />
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
