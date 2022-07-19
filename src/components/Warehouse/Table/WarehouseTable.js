import { useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import { disableWarehouse } from "@service/api/warehouse";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditWarehouseModal from "@components/Warehouse/Modal/EditWarehouseModal";

export default function WarehouseTable({
  warehouses = [],
  onChange,
  refresh,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [warehouse, setWarehouse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  if (loading == true) {
    return <Loading />;
  } else if (warehouses.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (warehouse) {
      disableWarehouse(warehouse?.id)
        .then((res) => {
          onChange(!refresh);
          toast.info("Bodega Eliminada");
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
          "Los productos y materias primas seguirán en la misma bodega eliminada. ¿Desea continuar con la eliminación?"
        }
        onShowModalChange={(showModal) => setYesNoModal(showModal)}
        onYes={() => handleDelete()}
      />
      <EditWarehouseModal
        showModal={showEditModal}
        onShowModalChange={(showModal) => setShowEditModal(showModal)}
        warehouse={warehouse}
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
              ID
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Ciudad
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {warehouses.map((warehouse) => (
            <tr
              key={`warehouse-item-${warehouse.id}`}
              className="hover:bg-gray-100"
            >
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(warehouse.name)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                #{warehouse.id}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(warehouse.city)}
              </td>
              <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setWarehouse(warehouse);
                      setShowEditModal(true);
                    }}
                    className="flex items-center mr-3 hover:scale-110 cursor-default transition-transform"
                  >
                    <PencilAltIcon className="w-4 mr-1" />
                    Editar
                  </div>
                  <div
                    onClick={() => {
                      setYesNoModal(true);
                      setWarehouse(warehouse);
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
