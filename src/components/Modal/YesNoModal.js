import { XCircleIcon, ExclamationCircleIcon } from "@heroicons/react/outline";

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
    <div className="z-50 absolute inset-0 flex items-center justify-center bg-beereign_bg bg-opacity-80">
      <div className="p-4 w-full max-w-md md:h-auto">
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
            <ExclamationCircleIcon className="mx-auto mb-4 w-14 text-beereign_silver" />
            <h3 className="mb-5 text-lg font-normal">{message}</h3>
            <button
              type="button"
              onClick={handleYes}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Sí, Continuar
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
