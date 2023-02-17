import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { updateSchema } from "application/product/schema";
import { updateProduct } from "application/product/service";
import Button from "application/common/button/normal";
import { logError } from "@utils/logError";

export default function EditProductModal({
  showModal,
  onShowModalChange,
  product,
  onEdit,
}) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  if (showModal === false) return <></>;

  function handleKeyPress(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      barcode: formData.get("barcode").toLocaleLowerCase(),
      name: formData.get("name").toLocaleLowerCase(),
      description: formData.get("description").toLocaleLowerCase(),
    };
    const { error } = await updateSchema.validate(data);

    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    updateProduct(product.id, data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Producto atualizado");
        onEdit();
        handleClose();
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    onShowModalChange(false);
  };
  return (
    <section className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3>Agregar producto</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <XMarkIcon className="w-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form className="w-full" ref={formRef} onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    htmlFor="barcode"
                  >
                    Código de barra:
                  </label>
                  <input
                    type="text"
                    name="barcode"
                    required
                    onKeyPress={handleKeyPress}
                    defaultValue={product?.barcode}
                    maxLength={128}
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    htmlFor="name"
                  >
                    Nombre:
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    defaultValue={product?.name}
                    maxLength={50}
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                >
                  Descripción del producto
                </label>
                <textarea
                  rows={3}
                  name="description"
                  required
                  defaultValue={product?.description}
                  maxLength={255}
                  className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                />
              </div>

              <div className="py-6 flex justify-center items-center rounded-b border-t border-gray-200">
                <Button loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
