import { usePagination } from "../../hooks/usePagination";
import { exportDataToExcel } from "../../utils/exportDataToExcel";

export const DataTable = ({
  columns,
  data = [],
  itemsPerPage = 5,
  badgesConfig,
  exportConfig = {
    enabled: true,
    fileName: "data_export",
    sheetName: "Datos",
    useColumnHeaders: true
  }
}) => {
  const {
    currentData: paginatedData,
    currentPage,
    maxPage,
    next,
    prev,
    jump,
  } = usePagination(data, itemsPerPage);

  const handleExport = () => {
    const options = {
      fileName: exportConfig.fileName,
      sheetName: exportConfig.sheetName,
    };

    if (exportConfig.useColumnHeaders) {
      options.columns = columns;
    } else if (exportConfig.fieldMappings) {
      options.fieldMappings = exportConfig.fieldMappings;
    }

    exportDataToExcel(data, options);
  };

  return (
    <>
      {exportConfig.enabled && (
        <div className="row left">
          <div className="col-md-3">
            <button 
              onClick={handleExport} 
              className="btn btn-outline-primary m-10"
              disabled={data.length === 0}
            >
              <i className="fas fa-file-excel"></i> Exportar a Excel
            </button>
          </div>
        </div>
      )}

      <div className="table-content mt-1">
        <table className="content-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={`${index}-${col.key}`}>
                    {badgesConfig?.[col.key] ? (
                      <span className={`btn-badge ${badgesConfig[col.key].variants[item[col.key]]}`}>
                        {item[col.key]}
                      </span>
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        maxPage={maxPage}
        next={next}
        prev={prev}
        jump={jump}
      />
    </>
  );
};

const PaginationControls = ({ currentPage, maxPage, next, prev, jump }) => (
  <div className="row mt-1">
    <div className="col-md-6 d-flex gap">
      <button onClick={prev} disabled={currentPage === 1} className="btn btn-outline-secondary">
        &laquo; Anterior
      </button>
      {[...Array(maxPage)].map((_, i) => (
        <button
          key={i}
          onClick={() => jump(i + 1)}
          className={`btn-small ${currentPage === i + 1 ? 'btn-info' : 'btn-outline-secondary'}`}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={next} disabled={currentPage === maxPage} className="btn btn-outline-secondary">
        Siguiente &raquo;
      </button>
    </div>
  </div>
);