import { useState } from "react";
import Loading from "@components/Animation/Loading";
import {
  PencilAltIcon,
  PrinterIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import PrintModal from "@components/Modal/PrintModal";
import { deleteRawMaterialBatch } from "@service/api/rawMaterialBatch";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";

export default function BatchTable({
  rawMaterialBatches = [],
  onDelete,
  refresh,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [id, setID] = useState(null);
  const [printLabel, setPrintLabel] = useState(false);
  const [item, setItem] = useState({});
  if (loading == true) {
    return <Loading />;
  } else if (rawMaterialBatches.length === 0) {
    return (
      <h3 className="text-center font-mono text-2xl">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (id) {
      deleteRawMaterialBatch(id)
        .then((res) => {
          onDelete(!refresh);
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
              Materia Prima
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
          {rawMaterialBatches.map((rawMaterialBatch) => (
            <tr
              key={`RawMaterialBatch-item-${rawMaterialBatch.id}`}
              className="border-b"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {rawMaterialBatch.id}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.employee.name)}{" "}
                {capitalize(rawMaterialBatch.employee.lastName)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.rawMaterial.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(rawMaterialBatch.warehouse.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.entryDate}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.expirationDate}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.quantity} {rawMaterialBatch.measurement}
              </td>
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                ${rawMaterialBatch.unitCost}
              </td>
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                ${rawMaterialBatch.totalCost}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {rawMaterialBatch.stock} {rawMaterialBatch.measurement}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setItem({
                        id: rawMaterialBatch.id,
                        name: rawMaterialBatch.rawMaterial.name,
                        quantity: `${rawMaterialBatch.quantity} ${rawMaterialBatch.measurement}`,
                      });
                      setPrintLabel(true);
                    }}
                  >
                    <PrinterIcon className="w-9 bg-transparent text-blue-500 xl:hidden" />
                    <div className="hidden xl:inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out">
                      Imprimir
                    </div>
                  </div>
                  <Link
                    href={`/raw-material-batch/edit/${rawMaterialBatch.id}`}
                  >
                    <a className="ml-4">
                      <PencilAltIcon className="w-9 bg-gray-200 rounded-lg text-beereign_grey xl:hidden" />
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
                      setID(rawMaterialBatch.id);
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
