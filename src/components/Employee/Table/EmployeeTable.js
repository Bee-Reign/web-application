import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { toast } from "react-toastify";

import { deleteEmployee } from "@service/api/employee";
import capitalize from "@utils/capitalize";

export default function EmployeeTable(props) {
  const { employees = [], loading } = props;
  if (loading == true) {
    return (
      <div className="mt-8 flex items-center justify-center space-x-2 animate-pulse">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-36 h-36 border-4 border-beereign_yellow border-solid rounded-full animate-spin"
        />
      </div>
    );
  } else if (employees.length === 0) {
    return (
      <h3 className="text-center font-mono font-medium text-lg">
        No hay empleados
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
              Nombre
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Apellido
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Celular
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Tipo de Empleado
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={`Employee-item-${employee.id}`} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {employee.id}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {capitalize(employee.name)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {capitalize(employee.lastName)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {employee.cellPhone}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {employee.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                {capitalize(employee.typeOfEmployee.name)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <Link href={`/employee/edit/${employee.id}`}>
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
