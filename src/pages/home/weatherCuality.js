import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, LineChart, Line, YAxis, CartesianGrid, XAxis } from "recharts";
import React, { useState, useEffect } from "react";

const COLORS = ['#00C49F', '#0a3671']; // Verde = limpia, Rojo = sucia

// Simulador de datos de calidad de agua
const fetchWaterQuality = () => {
    const clean = Math.random() * 100;
    const dirty = 100 - clean;

    return [
        { name: "Agua limpia", value: clean },
        { name: "Agua sucia", value: dirty },
    ];
};

export const WeatherQuality = () => {
    const [dataPie, setDataPie] = useState(fetchWaterQuality());

    useEffect(() => {
        const interval = setInterval(() => {
            setDataPie(fetchWaterQuality());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];


    const data2 = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={dataPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                >
                    {dataPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
    )
}