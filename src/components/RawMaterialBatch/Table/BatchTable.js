import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";

export default function BatchTable({ rawMaterialBatches = [], loading }) {
  if (loading == true) {
    return <Loading />;
  } else if (rawMaterialBatches.length === 0) {
    return (
      <h3 className="text-center font-mono text-2xl">
        no se encontró ningún registro
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
              className="font-mono text-black px-6 py-4 border-r"
            >
              Lote #
            </th>
            <th
              scope="col"
              className="font-mono text-black px-6 py-4 border-r"
            >
              Registrado Por
            </th>
            <th
              scope="col"
              className="font-mono text-black px-6 py-4 border-r"
            >
              Materia Prima
            </th>
            <th
              scope="col"
              className="font-mono text-black px-6 py-4 border-r"
            >
              Bodega
            </th>
            <th
              scope="col"
              className="font-mono text-black px-6 py-4 border-r"
            >
              Fecha de entrada
            </th>
            <th
              scope="col"
              className="font-mono text-black px-6 py-4 border-r"
            >
              Fecha de Expiración
            </th>
            <th
              scope="col"
              className="font-mono text-black px-6 py-4 border-r"
            >
              Cantidad Ingresada
            </th>
            <th
              scope="col"
              className="font-mono text-black px-6 py-4 border-r"
            >
              Costo Unitario
            </th>
            <th
              scope="col"
              className="font-mono text-black px-6 py-4 border-r"
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
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.employee.name)}{" "}
                {capitalize(rawMaterialBatch.employee.lastName)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.rawMaterial.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.warehouse.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.entryDate}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.expirationDate}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.quantity} {rawMaterialBatch.measurement}
              </td>
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                ${rawMaterialBatch.unitCost}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.stock} {rawMaterialBatch.measurement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
