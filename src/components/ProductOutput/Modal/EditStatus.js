import { useState } from "react";
import Button from "@components/Button";
import { XCircleIcon } from "@heroicons/react/outline";
import Select from "react-select";
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

  const isPaidOptions = [
    { value: true, label: "Sí" },
    { value: false, label: "No" },
  ];

  const handleChangeIsPaid = (value) => {
    setIsPaid(value.value);
  };

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
    <div className="z-50 absolute inset-0 flex items-center justify-center bg-beereign_bg bg-opacity-80">
      <div className="p-4 w-full max-w-md md:h-auto">
        <form onSubmit={handleSubmit}>
          <div className="relative bg-beereign_clear text-gray-900 rounded-xl shadow">
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-2.5 hover:text-beereign_yellow rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="popup-modal"
            >
              <XCircleIcon className="w-8" />
            </button>
            <div className="p-6 text-center">
              <div className="mb-5 mx-auto w-4/5 md:w-9/12 xl:w-3/5">
                <label className="font-serif text-lg">¿Esta Pago?</label>
                <Select
                  defaultValue={
                    productOutput.isPaid === true
                      ? isPaidOptions[0]
                      : isPaidOptions[1]
                  }
                  onChange={handleChangeIsPaid}
                  options={isPaidOptions}
                  isSearchable={false}
                />
              </div>
              <Button loading={loading} reset={false} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
