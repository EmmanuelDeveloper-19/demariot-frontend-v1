import * as XLSX from "xlsx";

/**
 * Exporta datos a Excel con configuración flexible
 * @param {Array} data - Datos a exportar
 * @param {Object} options - Opciones de configuración
 * @param {string} options.fileName - Nombre del archivo (sin extensión)
 * @param {string} options.sheetName - Nombre de la hoja de cálculo
 * @param {Object} options.fieldMappings - Mapeo de campos personalizados
 * @param {Array} options.columns - Columnas a incluir (si no se usa fieldMappings)
 */
export const exportDataToExcel = (data, options = {}) => {
  try {
    // Configuración por defecto
    const {
      fileName = "export",
      sheetName = "Datos",
      fieldMappings = null,
      columns = null
    } = options;

    // Validación de datos
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No hay datos válidos para exportar");
    }

    // Generar mapeo de campos
    const finalMappings = fieldMappings || generateDefaultMappings(data[0], columns);

    // Transformación de datos
    const exportData = data.map(item => {
      const row = {};
      for (const [key, header] of Object.entries(finalMappings)) {
        const value = key.split('.').reduce((obj, k) => obj?.[k], item);
        row[header] = value ?? "N/A";
      }
      return row;
    });

    // Creación del archivo
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    const dateStamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `${fileName}_${dateStamp}.xlsx`);

  } catch (error) {
    console.error("Error al exportar a Excel:", error);
    throw error;
  }
};

// Genera mapeos por defecto basados en las columnas o las keys del primer objeto
const generateDefaultMappings = (sampleItem, columns) => {
  if (columns) {
    return columns.reduce((acc, col) => {
      acc[col.key] = col.label || col.key;
      return acc;
    }, {});
  }
  
  // Si no hay columnas definidas, usa las keys del primer objeto
  const keys = Object.keys(sampleItem);
  return keys.reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
};