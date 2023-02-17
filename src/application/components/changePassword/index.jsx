import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { XCircleIcon } from "@heroicons/react/24/outline";

import { passwordResetSchema } from "application/employee/schema";
import { updatePassword } from "application/employee/service";
import { logError } from "@utils/logError";
import Button from "application/common/button/normal";

export default function ChangePassword({ showModal, id, onShowModalChange }) {
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
      password: formData.get("password"),
      repeat_password: formData.get("repeat_password"),
    };
    const { error } = await passwordResetSchema.validate(data);
    if (error) {
      toast.error("Las contraseñas no coinciden o no son validas");
      setLoading(false);
      return;
    }
    updatePassword(id, { password: formData.get("password") })
      .then((response) => {
        formRef.current.reset();
        toast.success("Contraseña actualizada");
      })
      .catch((error) => {
        logError(error);
      })
      .finally(() => {
        setLoading(false);
        handleClose();
      });
  };
  return (
    <div className="z-50 absolute inset-0 flex items-center justify-center bg-beereign_bg bg-opacity-80">
      <div className="p-4 w-full max-w-md md:h-auto">
        <div className="relative bg-beereign_clear text-gray-900 rounded-xl shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 bg-transparent hover:bg-gray-50 hover:text-beereign_yellow rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            data-modal-toggle="authentication-modal"
          >
            <XCircleIcon className="w-10" onClick={() => handleClose()} />
          </button>
          <div className="py-6 px-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium">Cambio de Contraseña</h3>
            <form
              className="space-y-6 text-center"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium"
                >
                  Nueva Contraseña
                </label>
                <input
                  name="password"
                  type="password"
                  maxLength={60}
                  minLength={8}
                  className="font-thin appearance-none relative block w-full px-3 py-4 border border-beereign_gray text-gray-900 focus:border-beereign_yellow rounded-md focus:outline-none sm:text-sm"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              <div>
                <label
                  htmlFor="repeat_password"
                  className="block mb-2 text-sm font-medium"
                >
                  Repetir Contraseña
                </label>
                <input
                  name="repeat_password"
                  type="password"
                  maxLength={60}
                  minLength={8}
                  className="font-thin appearance-none rounded-md relative block w-full px-3 py-4 border border-beereign_gray  text-gray-900 focus:border-beereign_yellow focus:outline-none sm:text-sm"
                  placeholder="Vuelva a ingresar la contraseña"
                />
              </div>
              <Button loading={loading} reset={false} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
