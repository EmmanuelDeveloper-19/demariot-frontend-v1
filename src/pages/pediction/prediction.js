import { useEffect, useState } from "react";
import { getColorimetrySensorData } from "../../services/sensores";
import {
  PieChart, Pie, Cell,
  ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, LineChart, Line,
  YAxis, CartesianGrid, XAxis
} from "recharts";

const COLORS = {
  plomo: "#e74c3c",
  cadmio: "#f1c40f",
  aluminio: "#3498db"
};

export const Prediction = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await getColorimetrySensorData();
        if (response.success) {
          setData(response.data.colorimetrySensor);
        }
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };
    obtenerDatos();
  }, []);

  // Agrupar y sumar por tipo de metal
  const groupedData = {
    plomo: [],
    cadmio: [],
    aluminio: []
  };

  data.forEach(entry => {
    const metal = entry.metals.metal.toLowerCase();
    if (groupedData[metal]) {
      groupedData[metal].push(entry);
    }
  });

  const pieData = Object.keys(groupedData).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value: groupedData[key].reduce((acc, e) => acc + e.metals.concentration_mgL, 0)
  }));

  const barData = Object.keys(groupedData).map(key => ({
    metal: key,
    concentracion: parseFloat(groupedData[key].reduce((acc, e) => acc + e.metals.concentration_mgL, 0).toFixed(2))
  }));

  const lineData = data.map(entry => ({
    timestamp: new Date(entry.timestamp).toLocaleString(),
    [entry.metals.metal.toLowerCase()]: entry.metals.concentration_mgL
  }));

  return (
    <div>
      <div className="row mb-1">
        <h1 className="text-subtitle text-primary">Concentración de metales pesados</h1>
      </div>

      <div className="row" style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
        {["plomo", "cadmio", "aluminio"].map(metal => {
          const total = groupedData[metal].reduce((acc, e) => acc + e.metals.concentration_mgL, 0);
          return (
            <div 
              className="card"
              key={metal} style={{
              padding: "20px",
              minWidth: "250px",
              flex: 1,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <h4 style={{ color: COLORS[metal], textTransform: "capitalize" }}>{metal}</h4>
              <p><strong>Mediciones:</strong> {groupedData[metal].length}</p>
              <p><strong>Concentración total:</strong> {total.toFixed(2)} mg/L</p>
              <p><strong>Promedio:</strong> {(total / (groupedData[metal].length || 1)).toFixed(2)} mg/L</p>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", marginBottom: "50px" }}>
        <div className="card" style={{ flex: 1, minWidth: "300px", height: "300px" }}>
          <h1 className="text-subtitle text-primary">Distribución por tipo de metal</h1>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[entry.name.toLowerCase()]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ flex: 1, minWidth: "300px", height: "300px" }}>
          <h1 className="text-primary text-subtitle">Concentración total por metal (mg/L)</h1>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metal" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="concentracion" fill="#2ecc71" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ height: "300px" }}>
        <h1 className="text-subtitle text-primary">Evolución temporal de concentraciones</h1>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="plomo" stroke={COLORS.plomo} />
            <Line type="monotone" dataKey="cadmio" stroke={COLORS.cadmio} />
            <Line type="monotone" dataKey="aluminio" stroke={COLORS.aluminio} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};