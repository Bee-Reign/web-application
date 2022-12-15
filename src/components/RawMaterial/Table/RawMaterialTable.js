import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import { deleteRawMaterial } from "@service/api/rawMaterial";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditRawMaterialModal from "../Modal/EditRawMaterialModal";

export default function RawMaterialTable({
  rawMaterials = [],
  onChange,
  refresh,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [rawMaterial, setRawMaterial] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  if (loading == true) {
    return <Loading />;
  } else if (rawMaterials.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (rawMaterial) {
      deleteRawMaterial(rawMaterial?.id)
        .then((res) => {
          onChange(!refresh);
          toast.info("Materia Prima Eliminada");
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
        message={"¿Desea Eliminar la Materia Prima?"}
        onShowModalChange={(showModal) => setYesNoModal(showModal)}
        onYes={() => handleDelete()}
      />
      <EditRawMaterialModal
        showModal={showEditModal}
        onShowModalChange={(showModal) => setShowEditModal(showModal)}
        rawMaterial={rawMaterial}
        onEdit={(refresh) => onChange(!refresh)}
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
              Código
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              En Inventario
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Costo Promedio Unitario
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Valor de Costo
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Registrado el
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rawMaterials.map((rawMaterial) => (
            <tr
              key={`RawMaterial-item-${rawMaterial.id}`}
              className={`hover:bg-gray-100 ${
                rawMaterial.stock > 0 ? "" : "bg-red-50"
              }`}
            >
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(rawMaterial.name)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                #{rawMaterial.id}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {rawMaterial.code.toLocaleUpperCase()}
              </td>
              {rawMaterial.measurement === "UNIDADES" ? (
                <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                  {Math.round(rawMaterial.stock)} {rawMaterial.measurement}
                </td>
              ) : (
                <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                  {rawMaterial.stock} {rawMaterial.measurement}
                </td>
              )}
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                $
                {Number(rawMaterial.amount) === 0
                  ? "0.00"
                  : (
                      Number(rawMaterial.amount) / Number(rawMaterial.stock)
                    ).toFixed(2)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                ${rawMaterial.amount}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {rawMaterial.createdAt}
              </td>
              <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setRawMaterial(rawMaterial);
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
                      setRawMaterial(rawMaterial);
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
