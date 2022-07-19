import { useState } from "react";
import {
  PencilAltIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import { deleteProductBatch } from "@service/api/productBatch";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditProductBatchModal from "../Modal/EditProductBatchModal";

export default function BatchTable({
  productBatches = [],
  onChange,
  loading,
  onPrint,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [batch, setBatch] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  if (loading == true) {
    return <Loading />;
  } else if (productBatches.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (batch) {
      deleteProductBatch(batch?.id)
        .then((res) => {
          onChange();
          toast.info("Lote de producto eliminado");
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
        message={"¿Desea Eliminar el Lote?"}
        onShowModalChange={(showModal) => setYesNoModal(showModal)}
        onYes={() => handleDelete()}
      />
      <EditProductBatchModal
        showModal={showEditModal}
        onShowModalChange={(showModal) => setShowEditModal(showModal)}
        batch={batch}
        onEdit={() => onChange()}
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
              Producto
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Lote #
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
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productBatches.map((productBatch) => (
            <tr
              key={`product-batch-item-${productBatch.id}`}
              className="hover:bg-gray-100"
            >
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {productBatch.packing.entryDate}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(productBatch.packing.product.name)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                #{productBatch.id}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(productBatch.packing.employee.name)}{" "}
                {capitalize(productBatch.packing.employee.lastName)}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(productBatch.packing.warehouse.name)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {productBatch.packing.expirationDate}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {productBatch.packing.quantity} UNIDADES
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                ${productBatch.unitCost}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                ${productBatch.totalCost}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {productBatch.stock} UNIDADES
              </td>
              <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
                <div className="flex justify-center">
                  <div
                    onClick={() =>
                      onPrint({
                        id: productBatch.id,
                        name: productBatch.packing.product.name,
                        time: productBatch.packing.createdAt,
                      })
                    }
                    className="flex items-center text-blue-500 mr-3 hover:scale-110 cursor-default transition-transform"
                  >
                    <PrinterIcon className="w-4 mr-1" />
                    Imprimir
                  </div>
                  <div
                    onClick={() => {
                      setBatch(productBatch);
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
                      setBatch(productBatch);
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
