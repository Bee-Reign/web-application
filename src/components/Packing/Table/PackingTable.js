import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";

export default function PackingTable({ batches = [], loading }) {
  if (loading == true) {
    return <Loading />;
  } else if (batches.length === 0) {
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
              Estado
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Producto
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
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {batches.map((productBatch) => (
            <tr
              key={`Product-Batch-item-${productBatch.id}`}
              className="border-b"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {productBatch.id}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(productBatch.employee.name)}{" "}
                {capitalize(productBatch.employee.lastName)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {productBatch.isFinished === true ? "Terminado" : "En Proceso"}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(productBatch.product.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(productBatch.warehouse.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productBatch.entryDate}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productBatch.expirationDate}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productBatch.quantity} UNIDADES
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <Link href={`/packing/${productBatch.id}`}>
                    <a>
                      <PencilIcon className="w-9 bg-gray-200 rounded-lg text-beereign_grey xl:hidden" />
                      <button
                        type="button"
                        className="hidden xl:inline-block px-6 py-2.5 bg-gray-200 text-beereign_grey font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Continuar
                      </button>
                    </a>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
