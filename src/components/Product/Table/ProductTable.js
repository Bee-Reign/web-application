import { useState } from "react";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import { deleteProduct } from "@service/api/product";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditProductModal from "@components/Product/Modal/EditProductModal";

export default function RawMaterialTable({
  products = [],
  onChange,
  refresh,
  loading,
}) {
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [product, setProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  if (loading == true) {
    return <Loading />;
  } else if (products.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleDelete = async () => {
    if (product) {
      deleteProduct(product?.id)
        .then((res) => {
          onChange(!refresh);
          toast.info("Producto eliminado");
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
      <EditProductModal
        showModal={showEditModal}
        onShowModalChange={(showModal) => setShowEditModal(showModal)}
        product={product}
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
              Código de Barra
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
          {products.map((product) => (
            <tr
              key={`product-item-${product.id}`}
              className={`hover:bg-gray-100 ${
                product.stock > 0 ? "" : "bg-red-50"
              }`}
            >
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(product.name)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                #{product.id}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {product.barcode}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {product.stock} UNIDADES
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                $
                {Number(product.amount) === 0
                  ? "0.00"
                  : (Number(product.amount) / Number(product.stock)).toFixed(2)}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                ${product.amount}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {product.createdAt}
              </td>
              <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setProduct(product);
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
                      setProduct(product);
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
