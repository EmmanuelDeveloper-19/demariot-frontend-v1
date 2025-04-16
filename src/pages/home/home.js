import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, LineChart, Line, YAxis, CartesianGrid, XAxis } from "recharts";

// Simulador de datos de calidad de agua
const fetchWaterQuality = () => {
    const clean = Math.random() * 100;
    const dirty = 100 - clean;

    return [
        { name: "Agua limpia", value: clean },
        { name: "Agua sucia", value: dirty },
    ];
};

// Colores personalizados
const COLORS = ['#00C49F', '#0a3671']; // Verde = limpia, Rojo = sucia

export const Home = () => {
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
        <>
            <h2 className="titulo">Inicio</h2>
            <div className="row">
                {/* Columna izquierda */}
                <div className="col-md-6" >
                    <div className="row" style={{ marginBottom: '10px' }}>
                        <div className="col-md-6">
                            <div className="card">
                                <h2 className="titulo">Calidad del agua</h2>
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
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <h2 className="titulo">Resumen del día</h2>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart width={150} height={40} data={data}>
                                        <Bar dataKey="uv" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <h2 className="titulo">Muestras registradas</h2>
                                <p className="numeros">500</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <h2 className="titulo">Número de alertas</h2>
                                <p className="numeros">400</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="col-md-6">
                    <div className="card" style={{ height: '100%' }}>
                        <h2 className="titulo">Predicción </h2>
                        <br></br>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart
                                width={500}
                                height={300}
                                data={data2}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
};
