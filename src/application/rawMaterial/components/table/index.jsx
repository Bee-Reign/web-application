import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import Loading from "application/common/animation/loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "application/common/yesNoModal";
import { deleteRawMaterial } from "application/rawMaterial/service";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditRawMaterialModal from "application/rawMaterial/components/editModal";

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
        message={"¿Desea eliminar la materia prima?"}
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
        <thead className="bg-white text-gray-400 tracking-tight text-xs">
          <tr>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Nombre
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Código
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              En inventario
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Costo promedio unitario
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Total
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Registrado el
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rawMaterials.map((rawMaterial) => (
            <tr
              key={`RawMaterial-item-${rawMaterial.id}`}
              className={`text-center text-sm text-gray-600 hover:bg-gray-100 ${
                rawMaterial.stock > 0 ? "" : "bg-red-50"
              }`}
            >
              <td className="p-4 whitespace-nowrap">
                {capitalize(rawMaterial.name)}
              </td>
              <td className="p-4 whitespace-nowrap">
                {rawMaterial.code.toLocaleUpperCase()}
              </td>
              {rawMaterial.measurement === "UNIDADES" ? (
                <td className="p-4 whitespace-nowrap">
                  {Math.round(rawMaterial.stock)} {rawMaterial.measurement}
                </td>
              ) : (
                <td className="p-4 whitespace-nowrap">
                  {rawMaterial.stock} {rawMaterial.measurement}
                </td>
              )}
              <td className="p-4 whitespace-nowrap">
                $
                {Number(rawMaterial.amount) === 0
                  ? "0.00"
                  : (
                      Number(rawMaterial.amount) / Number(rawMaterial.stock)
                    ).toFixed(2)}
              </td>
              <td className="p-4 whitespace-nowrap">${rawMaterial.amount}</td>
              <td className="p-4 whitespace-nowrap">{rawMaterial.createdAt}</td>
              <td className="p-4 whitespace-nowrap">
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
