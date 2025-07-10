import { useEffect, useState } from "react"
import { getPredictionData } from "../../../services/sensores";
import { usePagination } from "../../../hooks/usePagination";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    Line,
    LineChart
} from 'recharts';


export const MercurioTable = () => {

    const [predictionData, setPredictionData] = useState([]);
    const [selectedMetal, setSelectedMetal] = useState("todos");


    const {
        currentData: paginatedUsers,
        currentPage,
        maxPage,
        next,
        prev,
        jump,
    } = usePagination(predictionData, 5);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await getPredictionData();
                if (response.success) {
                    setPredictionData(response.data.predictionSensors);
                } else {
                    console.log("Error sds")
                }
            } catch (error) {
                return null;
            }
        };
        obtenerDatos();
    }, []);

    const filteredData = selectedMetal === "todos"
        ? predictionData
        : predictionData.filter(item => item.metal === selectedMetal);

    // Prepara los datos para la gráfica
    const barChartData = predictionData.map(item => ({
        fecha: new Date(item.timestamp).toLocaleDateString(),
        tds: item.tds,
        metal: item.metal
    }));

    const dashedLineChartData = filteredData.map(item => ({
        fecha: new Date(item.timestamp).toLocaleDateString(),
        tds: item.tds,
        metal: item.metal
    }));

    // Colores por tipo de metal (puedes personalizar)
    const metalColors = {
        "ninguno": "#8884d8",
        "plomo": "#ff7300",
        "hierro": "#82ca9d",
        "arsénico": "#d62728",
        "mercurio": "#0088FE",
        "cobre": "#a0522d",
    };


    return (
        <>
            <div className="table-container mt-1">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Temporada</th>
                            <th>ph</th>
                            <th>Temperatura</th>
                            <th>TDS</th>
                            <th>Colorimetria</th>
                            <th>Metal</th>
                            <th>Ubicación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((predictionData, index) => (
                            <tr key={predictionData._id}>
                                <td>{(currentPage - 1) * 5 + index + 1}</td>
                                <td>{predictionData.timestamp}</td>
                                <td>{predictionData.timestamp}</td>
                                <td>{predictionData.ph}</td>
                                <td>{predictionData.temp}</td>
                                <td>{predictionData.tds}</td>
                                <td>{predictionData.colorimetria}</td>
                                <td>{predictionData.metal}</td>
                                <td>{predictionData.location.coordinates}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row mt-10">
                <div className="col-md-6 d-flex gap">
                    <button onClick={prev} disabled={currentPage === 1} className="btn btn-outline-secondary m-10">
                        &laquo; Anterior
                    </button>

                    {[...Array(maxPage)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => jump(i + 1)}
                            className={`btn ${currentPage === i + 1 ? 'btn-info m-10' : 'btn-outline-secondary m-10'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button onClick={next} disabled={currentPage === maxPage} className="btn btn-outline-secondary m-10">
                        Siguiente &raquo;
                    </button>
                </div>
            </div>


            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="fecha" />
                        <YAxis label={{ value: 'TDS', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tds">
                            {barChartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={metalColors[entry.metal] || "#ccc"}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        {Object.entries(metalColors).map(([metal, color]) => (
                            <div key={metal} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: 15,
                                    height: 15,
                                    backgroundColor: color,
                                    borderRadius: 3,
                                }}></div>
                                <span>{metal.charAt(0).toUpperCase() + metal.slice(1)}</span>
                            </div>
                        ))}
                    </div>

                </ResponsiveContainer>
            </div>

            <div className="container">
                <h1>Filtrado por metal</h1>
                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="metalFilter" className="mr-2">Filtrar por metal:</label>
                    <select
                        id="metalFilter"
                        value={selectedMetal}
                        onChange={(e) => setSelectedMetal(e.target.value)}
                    >
                        <option value="todos">Todos</option>
                        {Object.keys(metalColors).map(metal => (
                            <option key={metal} value={metal}>
                                {metal.charAt(0).toUpperCase() + metal.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
<div style={{ width: '100%', height: 300 }}>
    <ResponsiveContainer>
        <LineChart data={dashedLineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fecha" />
            <YAxis label={{ value: 'TDS', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />

            {/* Línea punteada para TDS */}
            <Line
                type="monotone"
                dataKey="tds"
                stroke="#8884d8"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
            />
        </LineChart>
    </ResponsiveContainer>

    {/* Leyenda personalizada por tipo de metal */}
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        {Object.entries(metalColors).map(([metal, color]) => (
            <div key={metal} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                    width: 15,
                    height: 15,
                    backgroundColor: color,
                    borderRadius: 3,
                }}></div>
                <span>{metal.charAt(0).toUpperCase() + metal.slice(1)}</span>
            </div>
        ))}
    </div>
</div>


            </div>

        </>
    )
}