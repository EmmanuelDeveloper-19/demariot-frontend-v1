import { useEffect, useState } from "react"
import { getPhSensorData } from "../../services/sensores";
import { usePagination } from "../../hooks/usePagination";
import { exportDataToExcel } from "../../utils/exportDataToExcel";

export const PhTable = () => {
    const [phData, setPhData] = useState([]);
    const {
        currentData: paginatedUsers,
        currentPage,
        maxPage,
        next,
        prev,
        jump,
    } = usePagination(phData, 5);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await getPhSensorData();
                if (response.success) {
                    setPhData(response.data.phSensor);
                } else {
                    return null;
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
                valor: "Valores",
                timestamp: "Fecha de recopilación",
            }
        };

        exportDataToExcel(phData, options);
    };

    const getPhStatus = (valor) => {
        if (valor < 6.5) return { label: "PH Bajo", className: "btn btn-danger" };
        if (valor > 7.5) return { label: "PH Alto", className: "btn btn-warning" };
        return { label: "PH Normal", className: "btn btn-success" };
    };


    return (
        <>
            <div className="row d-flex justify-content-space-between">
                <div className="col-md-9 w-100">
                    <h2 className="text-subtitle text-primary">Información del ph</h2>
                    <p className="text-body text-primary">Datos recopilados por el sensor de ph</p>
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
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((phData, index) => {
                            const status = getPhStatus(phData.valor);

                            return (
                                <tr key={phData._id}>
                                    <td>{(currentPage - 1) * 5 + index + 1}</td>
                                    <td>{phData.valor}</td>
                                    <td>{phData.timestamp}</td>
                                    <td>
                                        <button className={status.className} disabled>
                                            {status.label}
                                        </button>
                                    </td>
                                </tr>
                            )
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
                            className={`btn ${currentPage === i + 1 ? 'btn-info m-10' : 'btn-outline-secondary m-10 w-100'}`}
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