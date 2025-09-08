import { useEffect, useState } from "react";
import { getColorimetrySensorData } from "../../services/sensores";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const parseSensorData = (rawData) => {
    const parsed = [];

    rawData.forEach((entry) => {
        const date = new Date(entry.timestamp).toLocaleDateString();
        parsed.push({
            date,
            [entry.metals.metal]: entry.metals.concentration_mgL,
        });
    });

    return parsed;
};

export const PredictionChart = () => {
    // Datos estáticos para los 12 meses del año
    const monthlyData = [
        { mes: 'Ene', cobre: 12, plomo: 8, cadmio: 3 },
        { mes: 'Feb', cobre: 15, plomo: 6, cadmio: 4 },
        { mes: 'Mar', cobre: 18, plomo: 9, cadmio: 2 },
        { mes: 'Abr', cobre: 14, plomo: 11, cadmio: 5 },
        { mes: 'May', cobre: 20, plomo: 7, cadmio: 6 },
        { mes: 'Jun', cobre: 22, plomo: 10, cadmio: 3 },
        { mes: 'Jul', cobre: 25, plomo: 12, cadmio: 4 },
        { mes: 'Ago', cobre: 19, plomo: 8, cadmio: 7 },
        { mes: 'Sep', cobre: 16, plomo: 14, cadmio: 5 },
        { mes: 'Oct', cobre: 21, plomo: 9, cadmio: 3 },
        { mes: 'Nov', cobre: 17, plomo: 13, cadmio: 6 },
        { mes: 'Dic', cobre: 13, plomo: 10, cadmio: 4 }
    ];

    // Función personalizada para el tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#fff',
                    fontSize: '14px'
                }}>
                    <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>{`Mes: ${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{
                            margin: '4px 0',
                            color: entry.color,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <span style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                backgroundColor: entry.color,
                                borderRadius: '50%',
                                marginRight: '8px'
                            }}></span>
                            {`${entry.name}: ${entry.value} registros`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px'
        }}>
            <h2 className='text-primary text-bold' style={{
                fontSize: '20px',
                margin: '0 0 20px 0'
            }}>
                Tendencia Mensual - Gráfica de Líneas
            </h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="mes"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#d1d5db' }}
                    />
                    <YAxis
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={{ stroke: '#d1d5db' }}
                        label={{ value: 'Registros', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                    />
                    <Line
                        type="monotone"
                        dataKey="cobre"
                        stroke="#f59e0b"
                        strokeWidth={3}
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                        name="Cobre"
                    />
                    <Line
                        type="monotone"
                        dataKey="plomo"
                        stroke="#ef4444"
                        strokeWidth={3}
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                        name="Plomo"
                    />
                    <Line
                        type="monotone"
                        dataKey="cadmio"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                        name="Cadmio"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

/*
export const PredictionChart = () => {
    const [data, setData] = useState([]);
    const [metals, setMetals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getColorimetrySensorData();
            if (res.success) {
                const raw = Array.isArray(res.data)
                    ? res.data
                    : res.data.colorimetrySensor || [];

                const formatted = parseSensorData(raw);

                // Combinar por fecha
                const grouped = {};
                formatted.forEach((d) => {
                    if (!grouped[d.date]) grouped[d.date] = { date: d.date };
                    Object.keys(d).forEach((k) => {
                        if (k !== "date") grouped[d.date][k] = d[k];
                    });
                });

                const final = Object.values(grouped);
                const allMetals = new Set(raw.map(d => d.metals.metal));

                setData(final);
                setMetals([...allMetals]);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: "1rem" }}>
            <h1 className="text-subtitle text-primary mb-1">Información de metales pesados</h1>
            <br></br>
            <ResponsiveContainer width="100%" height={300} >
                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: "mg/L", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    {metals.map((metal, idx) => (
                        <Line key={metal} type="monotone" dataKey={metal} stroke={`hsl(${idx * 60}, 70%, 50%)`} />
                    ))}
                </LineChart>
            </ResponsiveContainer>         
        </div>
    );
};
*/
/*
 <h3 style={{ marginTop: "2rem" }}>Tabla histórica de registros</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ccc" }}>Fecha</th>
                        <th style={{ borderBottom: "1px solid #ccc" }}>Metal</th>
                        <th style={{ borderBottom: "1px solid #ccc" }}>Concentración (mg/L)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.flatMap(row => metals.map(metal => (
                        row[metal] && (
                            <tr key={`${row.date}-${metal}`}>
                                <td>{row.date}</td>
                                <td>{metal}</td>
                                <td>{row[metal].toFixed(2)}</td>
                            </tr>
                        )
                    )))}
                </tbody>
            </table>
*/