import { useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import { deleteProduct } from "@service/api/product";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";

export default function RawMaterialTable({
  products = [],
  onDelete,
  refresh,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [id, setID] = useState(null);
  if (loading == true) {
    return <Loading />;
  } else if (products.length === 0) {
    return (
      <h3 className="text-center font-mono text-2xl">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (id) {
      deleteProduct(id)
        .then((res) => {
          onDelete(!refresh);
          toast.info("Producto Eliminado");
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
              ID
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Código de Barra
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Nombre
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              En Inventario
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Costo Promedio Unitario
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Valor de Costo
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Registrado el
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={`Product-item-${product.id}`}
              className={`border-b ${product.stock > 0 ? "" : "bg-red-50"}`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium border-r">
                {product.id}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {product.barcode}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(product.name)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {product.stock} UNIDADES
              </td>
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                $
                {Number(product.amount) === 0
                  ? "0.00"
                  : (Number(product.amount) / Number(product.stock)).toFixed(2)}
              </td>
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                ${product.amount}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {product.createdAt}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                <div className="flex justify-center">
                  <Link href={`/product/edit/${product.id}`}>
                    <a>
                      <PencilAltIcon className="w-9 bg-transparent rounded-lg text-beereign_grey xl:hidden" />
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
                      setID(product.id);
                    }}
                  >
                    <TrashIcon className="w-9 bg-transparent text-red-500 xl:hidden" />
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
