import { useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import { deleteTypeOfEmployee } from "@service/api/typeOfEmployee";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";

export default function TypeOfEmployeeTable({
  typesOfEmployee = [],
  onDelete,
  refresh,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [id, setID] = useState(null);
  if (loading == true) {
    return <Loading />;
  } else if (typesOfEmployee.length === 0) {
    return (
      <h3 className="text-center font-mono text-2xl">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (id) {
      deleteTypeOfEmployee(id)
        .then((res) => {
          onDelete(!refresh);
          toast.info("Tipo de empleado Eliminado");
        })
        .catch((err) => {
          logError(err);
        });
    }
  };
  return (
    <>
      <YesNoModal
        showModal={showYesNoModal}
        message={
          "Los usuarios que tienen este tipo de empleado seguirán teniendo los mismos permisos. ¿Desea continuar con la eliminación?"
        }
        onShowModalChange={(showModal) => setYesNoModal(showModal)}
        onYes={() => handleDelete()}
      />
      <table className="min-w-full border text-center">
        <thead className="border-b">
          <tr>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              ID
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Nombre
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {typesOfEmployee.map((typeOfEmployee) => (
            <tr key={`Type-item-${typeOfEmployee.id}`} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {typeOfEmployee.id}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(typeOfEmployee.name)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <Link href={`/type-of-employee/edit/${typeOfEmployee.id}`}>
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
                  <div
                    className="ml-4"
                    onClick={() => {
                      setYesNoModal(true);
                      setID(typeOfEmployee.id);
                    }}
                  >
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
