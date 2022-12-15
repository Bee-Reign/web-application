import { useState } from "react";
import {
  PencilSquareIcon,
  NoSymbolIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import capitalize from "@utils/capitalize";
import { logError } from "@utils/logError";
import { disableEmployee, enableEmployee } from "@service/api/employee";
import Loading from "@components/Animation/Loading";
import YesNoModal from "@components/Modal/YesNoModal";
import EditEmployeeModal from "../Modal/EditEmployeeModal";

export default function EmployeeTable({
  employees = [],
  loading,
  onChange,
  refresh,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  if (loading == true) {
    return <Loading />;
  } else if (employees.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDisable = async () => {
    if (employee) {
      disableEmployee(employee?.id)
        .then((res) => {
          onChange(!refresh);
          toast.info("Empleado desactivado");
        })
        .catch((err) => {
          logError(err);
        });
    }
  };

  const handleEnable = async (id) => {
    enableEmployee(id)
      .then((res) => {
        onChange(!refresh);
        toast.info("Empleado activado");
      })
      .catch((err) => {
        logError(err);
      });
  };

  return (
    <>
      <YesNoModal
        showModal={showYesNoModal}
        message={"¿Desea desactivar el empleado?"}
        onShowModalChange={(showModal) => setYesNoModal(showModal)}
        onYes={() => handleDisable()}
      />
      <EditEmployeeModal
        showModal={showEditModal}
        onShowModalChange={(showModal) => setShowEditModal(showModal)}
        employee={employee}
        onEdit={(refresh) => onChange(refresh)}
        refresh={refresh}
      />
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-white">
          <tr>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Tipo de Empleado
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
              Celular
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Email
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
          {employees.map((employee) => (
            <tr
              key={`employee-item-${employee.id}`}
              className="hover:bg-gray-100"
            >
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(employee.name)} {capitalize(employee.lastName)}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(employee.typeOfEmployee.name)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                #{employee.id}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {employee.cellPhone}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {employee.email}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {employee.deleted === false ? (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-600 mr-2" />{" "}
                    Activado
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-600 mr-2" />{" "}
                    Desactivado
                  </div>
                )}
              </td>
              <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setEmployee(employee);
                      setShowEditModal(true);
                    }}
                    className="flex items-center mr-3 hover:scale-110 cursor-default transition-transform"
                  >
                    <PencilSquareIcon className="w-4 mr-1" />
                    Editar
                  </div>
                  {employee.deleted === false ? (
                    <div
                      onClick={() => {
                        setYesNoModal(true);
                        setEmployee(employee);
                      }}
                      className="flex items-center text-red-500 hover:scale-105 cursor-default transition-transform"
                    >
                      <NoSymbolIcon className="w-4 mr-1" />
                      Desactivar
                    </div>
                  ) : (
                    <div
                      onClick={() => handleEnable(employee?.id)}
                      className="flex items-center text-green-500 hover:scale-105 cursor-default transition-transform"
                    >
                      <CheckCircleIcon className="w-4 mr-1" />
                      Activar
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
