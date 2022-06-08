import { useState } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import { deleteProductBatch } from "@service/api/productBatch";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";

export default function BatchTable({
  productBatches = [],
  onDelete,
  refresh,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [id, setID] = useState(null);
  if (loading == true) {
    return <Loading />;
  } else if (productBatches.length === 0) {
    return (
      <h3 className="text-center font-mono text-2xl">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (id) {
      deleteProductBatch(id)
        .then((res) => {
          onDelete(!refresh);
          toast.info("Lote de Producto Eliminado");
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
      <table className="min-w-full border text-center">
        <thead className="border-b">
          <tr>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Lote #
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Registrado Por
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Producto
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Bodega
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Fecha de entrada
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Fecha de Expiración
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Cantidad Ingresada
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Costo Unitario
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Valor de Costo
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Disponible
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productBatches.map((productBatch) => (
            <tr
              key={`Product-Batch-item-${productBatch.id}`}
              className="border-b"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {productBatch.id}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(productBatch.employee.name)}{" "}
                {capitalize(productBatch.employee.lastName)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(productBatch.product.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(productBatch.warehouse.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productBatch.entryDate}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productBatch.expirationDate}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productBatch.quantity} UNIDADES
              </td>
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                ${productBatch.unitCost}
              </td>
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                ${productBatch.totalCost}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productBatch.stock} UNIDADES
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <Link href={`/product-batch/edit/${productBatch.id}`}>
                    <a>
                      <PencilIcon className="w-9 bg-gray-200 rounded-lg text-beereign_grey xl:hidden" />
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
                      setID(productBatch.id);
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
