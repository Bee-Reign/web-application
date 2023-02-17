import { PlayIcon } from "@heroicons/react/24/outline";

import capitalize from "@utils/capitalize";
import Loading from "application/common/animation/loading";
import Link from "next/link";

export default function PackingTable({ packings = [], loading }) {
  if (loading == true) {
    return <Loading />;
  } else if (packings.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }
  return <>
    <table className="min-w-full divide-y divide-gray-200 table-fixed">
      <thead className="bg-white">
        <tr>
          <th
            scope="col"
            className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
          >
            Registrado Por
          </th>
          <th
            scope="col"
            className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
          >
            Fecha
          </th>
          <th
            scope="col"
            className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
          >
            ID
          </th>
          <th
            scope="col"
            className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
          >
            Bodega
          </th>
          <th
            scope="col"
            className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
          >
            Producto
          </th>
          <th
            scope="col"
            className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
          >
            Cantidad
          </th>
          <th
            scope="col"
            className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
          >
            Estado
          </th>
          <th
            scope="col"
            className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
          ></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {packings.map((packing) => (
          <tr
            key={`packing-item-${packing.id}`}
            className={`hover:bg-gray-100 ${
              packing.isDone === false ? "bg-yellow-50" : ""
            }`}
          >
            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
              {capitalize(packing.employee.name)}{" "}
              {capitalize(packing.employee.lastName)}
            </td>
            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
              {packing.createdAt}
            </td>
            <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
              #{packing.id}
            </td>
            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
              {capitalize(packing.warehouse.name)}
            </td>
            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
              {capitalize(packing.product.name)}
            </td>
            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
              {packing.quantity}
            </td>
            <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
              {packing.isDone === false ? (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-600 mr-2" />{" "}
                  En processo
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2" />{" "}
                  Terminado
                </div>
              )}
            </td>
            <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
              <div className="flex justify-center">
                <div className="flex items-center mr-3 hover:scale-110 cursor-default transition-transform">
                  {packing.isDone === false ? (
                    (<Link
                      href={`/packing/${packing.id}`}
                      className="flex items-center text-green-600">

                      <PlayIcon className="w-4 mr-1" />Continuar
                    </Link>)
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>;
}
