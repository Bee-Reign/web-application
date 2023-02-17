import { useState } from "react";
import {
  PencilSquareIcon,
  NoSymbolIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import capitalize from "@utils/capitalize";
import { logError } from "@utils/logError";
import { disableEmployee, enableEmployee } from "application/employee/service";
import Loading from "application/common/animation/loading";
import YesNoModal from "application/common/yesNoModal";
import EditEmployeeModal from "application/employee/components/editModal";

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
        <thead className="bg-white text-gray-400 tracking-tight text-xs">
          <tr>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Nombre
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Tipo de empleado
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Celular
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Email
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Estado
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr
              key={`employee-item-${employee.id}`}
              className="text-center text-sm text-gray-600 hover:bg-gray-100"
            >
              <td className="p-4 whitespace-nowrap">
                {capitalize(employee.name)} {capitalize(employee.lastName)}
              </td>
              <td className="p-4 whitespace-nowrap">
                {capitalize(employee.typeOfEmployee.name)}
              </td>
              <td className="p-4 whitespace-nowrap">{employee.cellPhone}</td>
              <td className="p-4 whitespace-nowrap">{employee.email}</td>
              <td className="p-4 whitespace-nowrap">
                {employee.deleted === false ? (
                  <div className="flex items-center justify-center">
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
              <td className="p-4 whitespace-nowrap">
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
