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
          fileName: "Datos_PH",
          sheetName: "PH Sensor",
          fieldMappings: {
            id_sensor: "Nombre del sensor",
            values: "Valores",
            timestamp: "Fecha de recopilación",
            "location.coordinates": "Coordenadas",
          }
        };
      
        exportDataToExcel(tempData, options);
      };

    return (
        <>
            <div className="row">
                <div className="col-md-9 align-items-center">
                    <h2 className="text-subtitle text-primary">Información de la temperatura</h2>
                    <p className="text-body text-primary">Datos recopilados por el sensor de temperatura</p>
                </div>
                <div className="col-md-3 d-flex gap">
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
                            <th>Nombre del sensor</th>
                            <th>Valores</th>
                            <th>Fecha de recopilación</th>
                            <th>Coordenadas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((tempData, index) => (
                            <tr key={tempData._id}>
                                <td>{(currentPage - 1) * 5 + index + 1}</td>
                                <td>{tempData.id_sensor}</td>
                                <td>{tempData.values}</td>
                                <td>{tempData.timestamp}</td>
                                <td>{tempData.location.coordinates}</td>
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
        </>
    )
}