import { useState } from "react";
import Loading from "@components/Animation/Loading";
import {
  PencilSquareIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import PrintModal from "@components/Modal/PrintModal";
import { deleteRawMaterialBatch } from "@service/api/rawMaterialBatch";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditRawMaterialBatchModal from "../Modal/EditRawMaterialBatchModal";

export default function BatchTable({
  rawMaterialBatches = [],
  onChange,
  refresh,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [batch, setBatch] = useState(null);
  const [printLabel, setPrintLabel] = useState(false);
  const [item, setItem] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  if (loading == true) {
    return <Loading />;
  } else if (rawMaterialBatches.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (batch) {
      deleteRawMaterialBatch(batch?.id)
        .then((res) => {
          onChange(!refresh);
          toast.info("Lote de Materia Prima Eliminada");
        })
        .catch((err) => {
          logError(err);
        });
    }
  };
  return (
    <>
      <PrintModal
        showModal={printLabel}
        item={item}
        onShowLabelChange={(value) => setPrintLabel(value)}
      />
      <YesNoModal
        showModal={showYesNoModal}
        message={"¿Desea Eliminar el Lote?"}
        onShowModalChange={(showModal) => setYesNoModal(showModal)}
        onYes={() => handleDelete()}
      />
      <EditRawMaterialBatchModal
        showModal={showEditModal}
        onShowModalChange={(showModal) => setShowEditModal(showModal)}
        batch={batch}
        onEdit={() => onChange(!refresh)}
      />
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-white">
          <tr>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Fecha de entrada
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Materia Prima
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Lote
            </th>
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
              Bodega
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Fecha de Expiración
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Cantidad Ingresada
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Costo Unitario
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
              Disponible
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rawMaterialBatches.map((rawMaterialBatch) => (
            <tr
              key={`RawMaterialBatch-item-${rawMaterialBatch.id}`}
              className="hover:bg-gray-100"
            >
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {rawMaterialBatch.entryDate}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(rawMaterialBatch.rawMaterial.name)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                #{rawMaterialBatch.id}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(rawMaterialBatch.employee.name)}{" "}
                {capitalize(rawMaterialBatch.employee.lastName)}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(rawMaterialBatch.warehouse.name)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {rawMaterialBatch.expirationDate}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {rawMaterialBatch.quantity}{" "}
                {rawMaterialBatch.rawMaterial.measurement}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                ${rawMaterialBatch.unitCost}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                ${rawMaterialBatch.totalCost}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {rawMaterialBatch.stock}{" "}
                {rawMaterialBatch.rawMaterial.measurement}
              </td>
              <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setItem({
                        id: rawMaterialBatch.id,
                        name: rawMaterialBatch.rawMaterial.name,
                        time: rawMaterialBatch.createdAt,
                      });
                      setPrintLabel(true);
                    }}
                    className="flex items-center text-blue-500 mr-3 hover:scale-110 cursor-default transition-transform"
                  >
                    <PrinterIcon className="w-4 mr-1" />
                    Imprimir
                  </div>
                  <div
                    onClick={() => {
                      setBatch(rawMaterialBatch);
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
                      setBatch(rawMaterialBatch);
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
