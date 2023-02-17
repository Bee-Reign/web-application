import { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { newRawMaterialSchema } from "application/rawMaterial/schema";
import { addRawMaterial } from "application/rawMaterial/service";
import { logError } from "@utils/logError";
import Button from "application/common/button/normal";

export default function AddRawMaterialModal({
  showModal,
  onShowModalChange,
  onAdd,
  refresh,
}) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  if (showModal === false) return <></>;

  const handleClose = () => {
    onShowModalChange(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      code: formData.get("code").toLocaleLowerCase(),
      name: formData.get("name").toLocaleLowerCase(),
      measurement: formData.get("measurement"),
    };
    const { error } = await newRawMaterialSchema.validate(data);

    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    addRawMaterial(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Materia prima registrada");
        onAdd(!refresh);
        handleClose();
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <div>
              <h3 className="font-medium text-lg">Agregar materia prima</h3>
              <p className="pt-2 text-sm text-gray-400">
                Esta acción registrará una materia prima, necesaria para la
                producción de los productos derivados de la apicultura.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <XMarkIcon className="w-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form className="w-full" ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="code"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Código
                  </label>
                  <input
                    type="text"
                    name="code"
                    required
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    placeholder="BP8Z001"
                    maxLength={12}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    placeholder="Botella plastico de 8z"
                    maxLength={50}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="measurement"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Unidad de medida
                  </label>
                  <select
                    name="measurement"
                    className="appearance-none bg-white block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  >
                    <option value="GALONES">GALONES</option>
                    <option value="GRAMOS">GRAMOS</option>
                    <option value="KILOGRAMOS">KILOGRAMOS</option>
                    <option value="LIBRAS">LIBRAS</option>
                    <option value="LITROS">LITROS</option>
                    <option value="ONZAS">ONZAS</option>
                    <option value="UNIDADES">UNIDADES</option>
                  </select>
                </div>
              </div>
              <div className="pt-6 flex justify-center items-center rounded-b border-t border-gray-200">
                <Button loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
