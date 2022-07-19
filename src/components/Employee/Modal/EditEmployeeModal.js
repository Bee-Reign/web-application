import { useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import EmployeeUpdateForm from "../Form/EmployeeUpdateForm";

export default function EditEmployeeModal({
  showModal,
  onShowModalChange,
  employee,
  onEdit,
  refresh,
}) {
  const [profile, setProfile] = useState(true);

  if (showModal === false) return <></>;

  const handleClose = () => {
    onShowModalChange(false);
  };

  return (
    <section className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg">
          <div className="p-5 rounded-t border-b">
            <div className="flex justify-between items-start">
              <h3>Editar empleado</h3>
              <button
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <XIcon className="w-5" />
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setProfile(true)}
                className={` ${
                  profile === true
                    ? "text-white bg-beereign_yellow"
                    : "text-gray-900 bg-white"
                } xl:hover:bg-gray-100 border border-gray-300 font-medium inline-flex items-center rounded-lg text-base px-6 py-3 text-center xl:hover:scale-105 transition-transform mr-1`}
              >
                Perfil
              </button>
              <button
                onClick={() => setProfile(false)}
                type="button"
                className={` ${
                  profile === false
                    ? "text-white bg-beereign_yellow"
                    : "text-gray-900 bg-white"
                } xl:hover:bg-gray-100 border border-gray-300 font-medium inline-flex items-center rounded-lg text-base px-6 py-3 text-center xl:hover:scale-105 transition-transform`}
              >
                Acceso
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <EmployeeUpdateForm
              profile={profile}
              employee={employee}
              onHandleClose={() => handleClose()}
              onEdit={() => onEdit(!refresh)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
