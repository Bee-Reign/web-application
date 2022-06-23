import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { updateSchema } from "@schema/typeOfEmployeeSchema";
import {
  updateTypeOfEmployee,
  getAllModules,
  getAllModulesByTypeId,
} from "@service/api/typeOfEmployee";
import Button from "@components/Button";
import { logError } from "@utils/logError";

export default function EditType({ typeOfEmployee }) {
  const formRef = useRef(null);
  const [modules, setModules] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!typeOfEmployee) return;
    const loadModules = async () => {
      getAllModulesByTypeId(typeOfEmployee?.id).then((result) => {
        setSelected(result);
        getAllModules()
          .then((result) => {
            setModules(result);
          })
          .catch((error) => {
            logError(error);
          })
          .finally(() => {});
      });
    };
    loadModules();
  }, [typeOfEmployee]);

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

  const checkSelected = (moduleId) => {
    const list = selected;
    for (let i in list) {
      if (list[i] === moduleId) return true;
    }
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
    const { error } = await updateSchema.validate(data);

    if (error) {
      toast.error("*" + error);
      setLoading(false);
      return null;
    }
    updateTypeOfEmployee(typeOfEmployee.id, data)
      .then((response) => {
        formRef.current.reset();
        setSelected([]);
        toast.success("Tipo de Empleado Actualizado");
        router.push("/type-of-employee");
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="mt-5" ref={formRef} onSubmit={handleSubmit}>
      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          name="name"
          type="text"
          required
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Nombre *"
          maxLength={30}
          defaultValue={typeOfEmployee?.name}
        />
      </div>
      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <textarea
          name="description"
          required
          className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-sm outline-none focus:border-blue-400"
          placeholder="Descripción del tipo de empleado..."
          maxLength={255}
          defaultValue={typeOfEmployee?.description}
        />
      </div>
      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <div className="text-left">
          <h3 className="text-xl font-mono ">
            Seleccionar los módulos disponibles para el tipo de empleado
          </h3>
          <div className="form-check">
            {modules?.map((module) => (
              <div key={module.id} className="mt-2">
                {checkSelected(module.id) ? (
                  <input
                    className="scale-150 form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-beereign_yellow checked:border-beereign_yellow focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    onClick={(e) => handleAdd(module.id)}
                    defaultChecked
                  />
                ) : (
                  <input
                    className="scale-150 form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-beereign_yellow checked:border-beereign_yellow focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    onClick={(e) => handleAdd(module.id)}
                  />
                )}
                <label
                  className="form-check-label inline-block font-serif text-lg"
                  htmlFor="modulo1"
                >
                  {module.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button loading={loading} reset={false} />
    </form>
  );
}
