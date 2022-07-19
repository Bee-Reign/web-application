import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";

export default function YesNoModal({
  showModal,
  message,
  onShowModalChange,
  onYes,
}) {
  if (showModal === false) return <></>;

  const handleYes = () => {
    onYes();
    onShowModalChange(false);
  };

  const handleClose = () => {
    onShowModalChange(false);
  };
  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-beereign_bg bg-opacity-80">
      <div className="p-4 w-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg">
          <div className="flex justify-end p-2">
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="popup-modal"
            >
              <XIcon className="w-6" />
            </button>
          </div>
          <div className="p-6 pt-0 text-center">
            <ExclamationCircleIcon className="mx-auto mb-5 w-20 text-red-700" />
            <h3 className="mb-6 text-xl font-normal text-gray-500">{message}</h3>
            <button
              type="button"
              onClick={handleYes}
              className="text-white bg-gradient-to-br from-red-600 to-red-800 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 shadow-md shadow-gray-300 hover:scale-105 transition-transform"
            >
              Sí, Continuar
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center hover:scale-105 transition-transform"
            >
              No, Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
