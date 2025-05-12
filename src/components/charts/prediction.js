import { useEffect, useState } from "react";
import { getColorimetrySensorData } from "../../services/sensores";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

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