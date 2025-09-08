import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export const MetalData = () => {
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
        <div className='container'>
            {/* Header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '30px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '20px'
            }}>
                <h1 className='text-primary text-bold' style={{
                    fontSize: '28px',
                    margin: '0 0 8px 0'
                }}>
                    Análisis de Metales Detectados
                </h1>
                <p className='text-primary' style={{
                    fontSize: '16px',
                    margin: '0'
                }}>
                    Monitoreo mensual de cobre, plomo y cadmio durante el año
                </p>
            </div>

            {/* Stats Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
            }}>
                <div style={{
                    backgroundColor: '#fef3c7',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#92400e',
                        margin: '0 0 8px 0'
                    }}>
                        Cobre
                    </h3>
                    <p style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#b45309',
                        margin: '0'
                    }}>
                        212 registros
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#fee2e2',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#991b1b',
                        margin: '0 0 8px 0'
                    }}>
                        Plomo
                    </h3>
                    <p style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#dc2626',
                        margin: '0'
                    }}>
                        117 registros
                    </p>
                </div>

                <div style={{
                    backgroundColor: '#f3e8ff',
                    border: '1px solid #8b5cf6',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#6b21a8',
                        margin: '0 0 8px 0'
                    }}>
                        Cadmio
                    </h3>
                    <p style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#7c3aed',
                        margin: '0'
                    }}>
                        52 registros
                    </p>
                </div>
            </div>

            {/* Line Chart */}
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

            {/* Bar Chart */}
            <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '20px'
            }}>
                <h2 className='text-primary text-bold' style={{
                    fontSize: '20px',
                    margin: '0 0 20px 0'
                }}>
                    Comparación Mensual - Gráfica de Barras
                </h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyData}>
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
                            iconType="rect"
                        />
                        <Bar
                            dataKey="cobre"
                            fill="#f59e0b"
                            name="Cobre"
                            radius={[2, 2, 0, 0]}
                        />
                        <Bar
                            dataKey="plomo"
                            fill="#ef4444"
                            name="Plomo"
                            radius={[2, 2, 0, 0]}
                        />
                        <Bar
                            dataKey="cadmio"
                            fill="#8b5cf6"
                            name="Cadmio"
                            radius={[2, 2, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div style={{
                textAlign: 'center',
                marginTop: '30px',
                paddingTop: '20px',
                borderTop: '1px solid #e5e7eb'
            }}>
                <p className='text-primary' style={{
                    fontSize: '14px',
                    margin: '0'
                }}>
                    Datos actualizados automáticamente • Última actualización: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    )
}