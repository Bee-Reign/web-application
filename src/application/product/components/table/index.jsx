import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import Loading from "application/common/animation/loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "application/common/yesNoModal";
import { deleteProduct } from "application/product/service";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditProductModal from "application/product/components/editProduct";

export default function ProductTable({
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
        message={"¿Desea eliminar el producto?"}
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
        <thead className="bg-white text-gray-400 tracking-tight text-xs">
          <tr>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Nombre del producto
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Código de barra
            </th>

            <th scope="col" className="py-3 font-extrabold uppercase">
              En inventario
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Costo promedio Unitario
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Total
            </th>
            <th scope="col" className="py-3 font-extrabold uppercase">
              Registrado el
            </th>
            <th scope="col" className="py-3 font-medium uppercase"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr
              key={`product-item-${product.id}`}
              className={`text-center text-sm text-gray-600 hover:bg-gray-100 ${
                product.stock > 0 ? "" : "bg-red-50"
              }`}
            >
              <td className="p-4 whitespace-nowrap">
                {capitalize(product.name)}
              </td>
              <td className="p-4 whitespace-nowrap">{product.barcode}</td>
              <td className="p-4 whitespace-nowrap">
                {product.stock} UNIDADES
              </td>
              <td className="p-4 whitespace-nowrap">
                $
                {Number(product.amount) === 0
                  ? "0.00"
                  : (Number(product.amount) / Number(product.stock)).toFixed(2)}
              </td>
              <td className="p-4 whitespace-nowrap">${product.amount}</td>
              <td className="p-4 whitespace-nowrap">{product.createdAt}</td>
              <td className="p-4">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setProduct(product);
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
