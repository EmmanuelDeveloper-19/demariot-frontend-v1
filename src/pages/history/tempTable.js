import { useEffect, useState } from "react"
import { getPhSensorData, getTempSensorData } from "../../services/sensores";
import { usePagination } from "../../hooks/usePagination";
import { exportDataToExcel } from "../../utils/exportDataToExcel";

export const TempTable = () => {
    const [tempData, setTempData] = useState([]);
    const {
        currentData: paginatedUsers,
        currentPage,
        maxPage,
        next,
        prev,
        jump,
    } = usePagination(tempData, 5);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await getTempSensorData();
                if (response.success) {
                    setTempData(response.data.tempSensor);
                } else {
                    console.log("Error")
                }
            } catch (error) {
                return null;
            }
        };
        obtenerDatos();
    }, []);

    const handleExport = () => {
        const options = {
            fileName: "Datos_Temperatura",
            sheetName: "Sensor de Temperatura",
            fieldMappings: {
                valor: "Valores",
                timestamp: "Fecha de recopilación",
            }
        };

        exportDataToExcel(tempData, options);
    };

    const getTempStatus = (valor) => {
        if (valor < 20) return { label: "Muy Fría", className: "btn btn-primary" }; // azul
        if (valor <= 29) return { label: "Normal", className: "btn btn-success" };   // verde
        if (valor > 35) return { label: "Cálida", className: "btn btn-danger" };     // rojo
        return { label: "Cálida/Normal", className: "btn btn-warning" };            // opcional para valores 30–35
    };


    return (
        <>
            <div className="row d-flex">
                <div className="col-md-9 w-100">
                    <h2 className="text-subtitle text-primary">Información de la temperatura</h2>
                    <p className="text-body text-primary">Datos recopilados por el sensor de temperatura</p>
                </div>
                <div className="col-md-3 d-flex gap w-100" style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                    <button onClick={handleExport} className="btn btn-outline-primary m-10">
                        <i className="fas fa-file-excel"></i> Descargar en excel
                    </button>
                </div>
            </div>
            <div className="table-container mt-1">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Valores</th>
                            <th>Fecha de recopilación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((tempData, index) => {
                            const status = getTempStatus(tempData.valor);

                            return (
                                <tr key={tempData._id}>
                                    <td>{(currentPage - 1) * 5 + index + 1}</td>
                                    <td>{tempData.valor}</td>
                                    <td>{tempData.timestamp}</td>
                                    <td>
                                        <button className={status.className} disabled>
                                            {status.label}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
            <div className="row mt-10">
                <div className="col-md-6 d-flex gap">
                    <button onClick={prev} disabled={currentPage === 1} className="btn btn-outline-secondary m-10 w-100">
                        &laquo; Anterior
                    </button>

                    {[...Array(maxPage)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => jump(i + 1)}
                            className={`btn w-100 ${currentPage === i + 1 ? 'btn-info m-10' : 'btn-outline-secondary m-10'}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button onClick={next} disabled={currentPage === maxPage} className="btn btn-outline-secondary m-10 w-100">
                        Siguiente &raquo;
                    </button>
                </div>
            </div>
        </>
    )
}