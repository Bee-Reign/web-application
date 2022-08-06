import { useState } from "react";
import Button from "@components/Button";
import { XIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";

import { logError } from "@utils/logError";
import { updateIsPaid } from "@schema/productOutputSchema";

import { updateOutputIsPaid } from "@service/api/productOutput";

export default function EditStatus({
  showModal,
  productOutput,
  onChange,
  onShowModalChange,
}) {
  const [loading, setLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(null);
  if (showModal === false) return <></>;

  const handleClose = () => {
    onShowModalChange(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      isPaid: isPaid !== null ? isPaid : productOutput.isPaid,
    };
    const { error } = await updateIsPaid.validate(data);
    if (error) {
      toast.error("Seleccione una opción valida");
      setLoading(false);
      return null;
    }
    updateOutputIsPaid(productOutput.id, data)
      .then((response) => {
        toast.success("Salida de producto Actualizada");
        onChange();
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
    <>
      <section className="z-30 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
        <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:h-auto">
          <div className="relative bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between items-start p-5 rounded-t border-b">
              <h3>Cambiar estado de pago</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <XIcon className="w-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-full">
                    <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
                      ¿Esta pago?
                    </label>
                    <select
                      value={isPaid}
                      onChange={(e) => setIsPaid(e.target.value)}
                      className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    >
                      <option value={null}></option>
                      <option value={true}>Sí</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
                <div className="py-6 flex justify-center items-center rounded-b border-gray-200">
                  <Button loading={loading} reset={false} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
