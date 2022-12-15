import { useRef, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

import { emailSchema } from "@schema/employeeSchema";
import { sendRecoveryEmail } from "@service/api/employee";
import { logError } from "@utils/logError";

export default function RecoverPassword({ showModal, onShowModalChange }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  if (showModal === false) return <></>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      email: formData.get("email").toLocaleLowerCase(),
    };
    const { error } = await emailSchema.validate(data);
    if (error) {
      toast.error("Correo electrónico Requerido");
      setLoading(false);
      return;
    }
    sendRecoveryEmail(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Correo electrónico enviado");
      })
      .catch((error) => {
        logError(error);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };

  const handleClose = () => {
    onShowModalChange(false);
  };

  return (
    <div className="z-10 absolute inset-0 flex items-center justify-center bg-beereign_bg bg-opacity-80">
      <div className="max-w-2xl w-72 py-8 px-6 bg-white rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-mono">Restablecer</h3>
          <XCircleIcon
            className="w-10 -mr-5 -mt-12"
            onClick={() => handleClose()}
          />
        </div>
        <div className="mt-4">
          <form className="text-center" ref={formRef} onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="text-lg font-sans text-gray-900"
              >
                Correo Electrónico
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={256}
                className="font-thin appearance-none relative block w-full px-3 py-4 border border-beereign_gray text-gray-900 focus:border-beereign_yellow rounded-md focus:outline-none sm:text-sm"
                placeholder="jhon@gmail.com"
              />
            </div>
            <ModalSendButton loading={loading} message={"Enviar"} />
          </form>
        </div>
      </div>
    </div>
  );
}

function ModalSendButton({ loading, message }) {
  if (loading == true) {
    return (
      <button
        type="submit"
        className="block w-full p-3 text-xl rounded-md text-black bg-beereign_yellow hover:bg-yellow-400"
      >
        <div
          style={{ borderTopColor: "transparent" }}
          className="mx-auto w-7 h-7 border-4 border-beereign_clear border-solid rounded-full animate-spin"
        />
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="block w-full p-3 text-xl rounded-md text-black bg-beereign_yellow hover:bg-yellow-400"
    >
      {message}
    </button>
  );
}
