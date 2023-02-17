import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { updateRawMaterialSchema } from "application/rawMaterial/schema";
import { updateRawMaterial } from "application/rawMaterial/service";
import Button from "application/common/button/normal";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";

export default function EditRawMaterialModal({
  showModal,
  onShowModalChange,
  rawMaterial,
  onEdit,
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
    const { error } = await updateRawMaterialSchema.validate(data);

    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    updateRawMaterial(rawMaterial.id, data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Materia prima actualizada");
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

  return (
    <section className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3>Editar materia prima</h3>
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
                    htmlFor="code"
                  >
                    Código:
                  </label>
                  <input
                    name="code"
                    required
                    defaultValue={rawMaterial?.code.toUpperCase()}
                    type="text"
                    maxLength={12}
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
                    name="name"
                    required
                    defaultValue={capitalize(rawMaterial?.name)}
                    type="text"
                    maxLength={50}
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/3 px-3 mb-5 md:mb-0">
                  <label
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    htmlFor="measurement"
                  >
                    Unidad de medida:
                  </label>
                  <input
                    list="measurements"
                    name="measurement"
                    required
                    defaultValue={rawMaterial?.measurement}
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  />
                  <datalist id="measurements">
                    <option value="GALONES"></option>
                    <option value="GRAMOS"></option>
                    <option value="KILOGRAMOS"></option>
                    <option value="LIBRAS"></option>
                    <option value="LITROS"></option>
                    <option value="ONZAS"></option>
                    <option value="UNIDADES"></option>
                  </datalist>
                </div>
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
