import { DataTable } from "../../components/table/DataTable";

export const MercurioTab = ({  }) => {
  const columns = [
    { key: "fecha", label: "Fecha de registro" },
    { key: "ubicacion", label: "Ubicación" },
    { key: "cantidad", label: "Concentración (ppm)" },
    { key: "riesgo", label: "Nivel de riesgo" }
  ];

  const mercurioData = [
    {
      id: 1,
      fecha: "2022-07-14",
      ubicacion: "Cosalmoapan, Ver",
      cantidad: 100,
      riesgo: "Normal"
    },
    // ... más datos
  ];


  const badgesConfig = {
    riesgo: {
      variants: {
        Normal: "btn-outline-primary-light",
        Moderado: "btn-outline-yellow-light",
        Alto: "btn-outline-danger"
      }
    }
  };

  const exportConfig = {
    fileName: "monitoreo_mercurio",
    sheetName: "Registros Mercurio",
    useColumnHeaders: true,
    enabled: true,
  };

  return (
    <DataTable
      columns={columns}
      data={mercurioData}
      badgesConfig={badgesConfig}
      exportConfig={exportConfig}
    />
  );
};