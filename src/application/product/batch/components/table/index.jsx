import { useState } from "react";
import {
  PencilSquareIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import Loading from "application/common/animation/loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "application/common/yesNoModal";
import { deleteProductBatch } from "application/product/batch/service";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditProductBatchModal from "application/product/batch/components/editModal";

export default function ProductBatchTable({
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
        message={"¿Desea eliminar el lote?"}
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
        <thead className="bg-white text-gray-400 tracking-tight text-xs">
          <tr>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Fecha de entrada
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Nombre del producto
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Lote
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Registrado por
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Bodega
            </th>

            <th scope="col" className="py-3 font-extrabold uppercase">
              Fecha de expiración
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Cantidad ingresada
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Costo unitario
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Disponible
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Total
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productBatches.map((productBatch) => (
            <tr
              key={`product-batch-item-${productBatch.id}`}
              className="text-center text-sm text-gray-600 hover:bg-gray-100"
            >
              <td className="p-4 whitespace-nowrap">
                {productBatch.packing.entryDate}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(productBatch.packing.product.name)}
              </td>
              <td className="p-4 whitespace-nowrap">#{productBatch.id}</td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(productBatch.packing.employee.name)}{" "}
                {capitalize(productBatch.packing.employee.lastName)}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(productBatch.packing.warehouse.name)}
              </td>
              <td className="p-4 whitespace-nowrap">
                {productBatch.packing.expirationDate}
              </td>
              <td className="p-4 whitespace-nowrap">
                {productBatch.packing.quantity} UNIDADES
              </td>
              <td className="p-4 whitespace-nowrap">
                ${productBatch.unitCost}
              </td>
              <td className="p-4 whitespace-nowrap">
                {productBatch.stock} UNIDADES
              </td>
              <td className="p-4 whitespace-nowrap">
                ${productBatch.totalCost}
              </td>
              <td className="p-4 whitespace-nowrap">
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
                    <PencilSquareIcon className="w-4 mr-1" />
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
