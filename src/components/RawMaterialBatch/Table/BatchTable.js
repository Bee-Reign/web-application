import Loading from "@components/Animation/Loading";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import capitalize from "@utils/capitalize";
import Link from "next/link";

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
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Lote #
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Registrado Por
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Materia Prima
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Bodega
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Fecha de entrada
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Fecha de Expiración
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Cantidad Ingresada
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Costo Unitario
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Valor de Costo
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Disponible
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Acciones
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
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                ${rawMaterialBatch.totalCost}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.stock} {rawMaterialBatch.measurement}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <Link
                    href={`/raw-material-batch/edit/${rawMaterialBatch.id}`}
                  >
                    <a>
                      <PencilAltIcon className="w-9 bg-gray-200 rounded-lg text-beereign_grey xl:hidden" />
                      <button
                        type="button"
                        className="hidden xl:inline-block px-6 py-2.5 bg-gray-200 text-beereign_grey font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Editar
                      </button>
                    </a>
                  </Link>
                  <div className="ml-4">
                    <TrashIcon className="w-9 bg-gray-200 text-red-500 xl:hidden" />
                    <div className="hidden xl:inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out">
                      Eliminar
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
