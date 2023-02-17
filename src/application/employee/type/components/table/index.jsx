import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import Loading from "application/common/animation/loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "application/common/yesNoModal";
import { deleteTypeOfEmployee } from "application/employee/type/service";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditTypeOfEmployeeModal from "application/employee/type/components/editModal";

export default function TypeOfEmployeeTable({
  typesOfEmployee = [],
  onChange,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [typeOfEmployee, setTOE] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  if (loading == true) {
    return <Loading />;
  } else if (typesOfEmployee.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (typeOfEmployee) {
      deleteTypeOfEmployee(typeOfEmployee?.id)
        .then((res) => {
          onChange();
          toast.info("Tipo de empleado eliminado");
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
      <EditTypeOfEmployeeModal
        showModal={showEditModal}
        onShowModalChange={(showModal) => setShowEditModal(showModal)}
        typeOfEmployee={typeOfEmployee}
        onEdit={() => onChange()}
      />
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-white text-gray-400 tracking-tight text-xs">
          <tr>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Nombre
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {typesOfEmployee.map((typeOfEmployee) => (
            <tr
              key={`type-of-employee-item-${typeOfEmployee.id}`}
              className="text-center text-sm text-gray-600 hover:bg-gray-100"
            >
              <td className="p-4 whitespace-nowrap">
                {capitalize(typeOfEmployee.name)}
              </td>
              <td className="p-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setTOE(typeOfEmployee);
                      setShowEditModal(true);
                    }}
                    className="flex items-center mr-3 hover:scale-110 cursor-default transition-transform"
                  >
                    <PencilSquareIcon className="w-4 mr-1" />
                    Editar
                  </div>
                  <div
                    onClick={() => {
                      setYesNoModal(true);
                      setTOE(typeOfEmployee);
                    }}
                    className="flex items-center text-red-500 hover:scale-105 cursor-default transition-transform"
                  >
                    <TrashIcon className="w-4 mr-1" />
                    Eliminar
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
