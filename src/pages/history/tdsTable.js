import { useEffect, useState } from "react"
import { usePagination } from "../../hooks/usePagination";
import { getTdsData } from "../../services/sensores";

export const TdsTable = () => {

    const [tdsData, setTdsData] = useState([]);
    const {
        currentData: paginatedUsers,
        currentPage,
        maxPage,
        next,
        prev,
        jump,
    } = usePagination(tdsData, 5);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const response = await getTdsData();
                if (response.success) {
                    setTdsData(response.data.tdsSensor);
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
            fileName: "Datos_TDS",
            sheetName: "Sensor de TDS",
            fieldMappings: {
                valor: "Valores",
                timestamp: "Fecha de recopilación",
            }
        }
    }

    const getTdsStatus = (valor) => {
        if (valor < 300) return { label: "Buena", className: "btn bg-alert" }; // verde
        if (valor <= 600) return { label: "Regular", className: "btn bg-alert" }; // amarillo
        return { label: "Mala", className: "btn btn-danger" }; // rojo
    };


    return (
        <>
            <div className="row d-flex justify-content-space-between">
                <div className="col-md-9 w-100">
                    <h2 className="text-subtitle text-primary">Información del sensor de TDS</h2>
                    <p className="text-body text-primary">Datos recopilados por el sensor de tds</p>
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
                        {paginatedUsers.map((tdsData, index) => {
                            const status = getTdsStatus(tdsData.valor);

                            return (
                                <tr key={tdsData._id}>
                                    <td>{(currentPage - 1) * 5 + index + 1}</td>
                                    <td>{tdsData.valor}</td>
                                    <td>{tdsData.timestamp}</td>
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