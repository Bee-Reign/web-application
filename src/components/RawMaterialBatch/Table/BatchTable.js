import capitalize from "@utils/capitalize";

export default function BatchTable(props) {
  const { rawMaterialBatches = [], loading } = props;
  if (loading == true) {
    return (
      <div className="mt-8 flex items-center justify-center space-x-2 animate-pulse">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-36 h-36 border-4 border-beereign_yellow border-solid rounded-full animate-spin"
        />
      </div>
    );
  } else if (rawMaterialBatches.length === 0) {
    return (
      <h3 className="text-center font-mono font-medium text-lg">
        No se encontraron lotes de materia prima
      </h3>
    );
  }
  return (
    <>
      <table className="min-w-full border text-center">
        <thead className="border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              # Lote
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Registrado Por
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Materia Prima
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Bodega
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Fecha de entrada
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4"
            >
              Fecha de Expiración
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4"
            >
              Cantidad Ingresada
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4"
            >
              Costo Unitario
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4"
            >
              Disponible
            </th>
          </tr>
        </thead>
        <tbody>
          {rawMaterialBatches.map((rawMaterialBatch) => (
            <tr
              key={`RawMaterialBatch-item-${rawMaterialBatch.id}`}
              className="border-b"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {rawMaterialBatch.id}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.employee.name)}{" "}
                {capitalize(rawMaterialBatch.employee.lastName)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.rawMaterial.name)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.warehouse.name)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.entryDate}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.expirationDate}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.quantity} {rawMaterialBatch.measurement}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                ${rawMaterialBatch.unitCost}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.stock} {rawMaterialBatch.measurement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
