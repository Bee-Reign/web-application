import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";

import capitalize from "@utils/capitalize";

export default function RawMaterialTable(props) {
  const { rawMaterials = [], loading } = props;
  if (loading == true) {
    return (
      <div className="mt-8 flex items-center justify-center space-x-2 animate-pulse">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-36 h-36 border-4 border-beereign_yellow border-solid rounded-full animate-spin"
        />
      </div>
    );
  } else if (rawMaterials.length === 0) {
    return (
      <h3 className="text-center font-mono font-medium text-lg">
        No hay materias primas
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
              ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Código
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              En Inventario
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Costo Promedio Unitario
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Monto Total Disponible
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Registrado el
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {rawMaterials.map((rawMaterial) => (
            <tr key={`RawMaterial-item-${rawMaterial.id}`} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {rawMaterial.id}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {rawMaterial.code.toLocaleUpperCase()}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterial.name)}
              </td>
              {rawMaterial.measurement === "UNIDADES" ? (
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                  {Math.round(rawMaterial.stock)} {rawMaterial.measurement}
                </td>
              ) : (
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                  {rawMaterial.stock} {rawMaterial.measurement}
                </td>
              )}
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                ${rawMaterial.averageCost}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                ${rawMaterial.amount}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {rawMaterial.createdAt}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <Link href={`/raw-material/edit/${rawMaterial.id}`}>
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
