import { useRef, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { newSchema } from "application/employee/type/schema";
import { addTypeOfEmployee, getAllModules } from "application/employee/type/service";
import { logError } from "@utils/logError";
import Button from "application/common/button/normal";

export default function AddTypeOfEmployeeModal({
  showModal,
  onShowModalChange,
  onAdd,
}) {
  const formRef = useRef(null);
  const [modules, setModules] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadModules = async () => {
      getAllModules()
        .then((result) => {
          setModules(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {});
    };
    loadModules();
  }, []);

  if (showModal === false) return <></>;

  const handleClose = () => {
    onShowModalChange(false);
  };

  const handleAdd = async (module) => {
    const list = selected;
    for (let i in list) {
      if (list[i] === module) {
        const index = list.indexOf(list[i]);
        if (index > -1) {
          list.splice(index, 1);
        }
        return;
      }
    }
    list.push(module);
    setSelected(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name").toLocaleLowerCase(),
      description: formData.get("description").toLocaleLowerCase(),
      modules: selected,
    };
    const { error } = await newSchema.validate(data);

    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    addTypeOfEmployee(data)
      .then((response) => {
        formRef.current.reset();
        setSelected([]);
        toast.success("Tipo de empleado registrado");
        onAdd();
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
            <h3>Agregar tipo de empleado</h3>
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
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Tipo de empleado
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    placeholder="Trabajador de bodega"
                    maxLength={30}
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Descripción del tipo de empleado
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    maxLength={255}
                    required
                    placeholder="Solo tiene acceso a los módulos de bodega"
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="measurement"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Módulos accesibles para el tipo de empleado
                  </label>
                  <div className="form-check">
                    {modules?.map((module) => (
                      <div key={module.id} className="mt-2 flex items-center">
                        <input
                          className="xl:hover:scale-150 xl:hover:border-beereign_yellow form-check-input appearance-none h-7 w-8 border border-gray-300 rounded-sm bg-white checked:bg-beereign_yellow checked:border-beereign_yellow focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
                          type="checkbox"
                          onClick={(e) => handleAdd(module.id)}
                        />
                        <label className="font-medium text-left text-gray-900">
                          {module.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-3 flex justify-center items-center rounded-b border-gray-200">
                <Button loading={loading} reset={false} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
