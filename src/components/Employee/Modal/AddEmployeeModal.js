import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/20/solid";
import AsyncSelect from "react-select/async";

import { newEmployeeSchema } from "@schema/employeeSchema";
import { getAllTypesOfEmployee } from "@service/api/typeOfEmployee";
import { addEmployee } from "@service/api/employee";
import Button from "@components/Button";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";

export default function AddEmployeeModal({
  showModal,
  onShowModalChange,
  onAdd,
  refresh,
}) {
  const formRef = useRef(null);
  const [typeOfEmployee, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  let typeQuery = "";

  if (showModal === false) return <></>;

  const getTypesOfEmployee = () => {
    return getAllTypesOfEmployee(typeQuery)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        logError(err);
      });
  };

  const onInputChange = (value) => {
    typeQuery = value.toLocaleLowerCase();
  };

  const handleChangeType = (value) => {
    setType(value);
    typeQuery = "";
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name").toLocaleLowerCase(),
      lastName: formData.get("lastName").toLocaleLowerCase(),
      cellPhone: formData.get("cellPhone").toLocaleLowerCase(),
      email: formData.get("email").toLocaleLowerCase(),
      password: formData.get("password"),
      typeOfEmployeeId: typeOfEmployee ? typeOfEmployee?.id : null,
    };
    const { error } = await newEmployeeSchema.validate(data);

    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    addEmployee(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Empleado registrado");
        onAdd(!refresh);
        handleClose();
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClose = () => {
    setType(null);
    onShowModalChange(false);
  };

  return (
    <section className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3>Agregar empleado</h3>
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
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    placeholder="Jhon"
                    maxLength={20}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    placeholder="Doe"
                    maxLength={20}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    placeholder="example@my-company.com"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="cellPhone"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Celular
                  </label>
                  <input
                    type="text"
                    name="cellPhone"
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    placeholder="+507 0450 0898"
                    maxLength={20}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    placeholder="example-5@HA7Byh"
                    minLength={8}
                    maxLength={60}
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
                    Tipo de Empleado
                  </label>
                  <AsyncSelect
                    value={typeOfEmployee}
                    className="appearance-none block w-full text-gray-900 focus-within:ring-yellow-100 focus-within:border-beereign_yellow shadow-sm border border-gray-300 rounded py-1 focus:outline-none"
                    styles={customStyles}
                    getOptionLabel={(e) => capitalize(e.name, true)}
                    getOptionValue={(e) => e.id}
                    loadOptions={getTypesOfEmployee}
                    onInputChange={onInputChange}
                    cacheOptions
                    defaultOptions
                    placeholder={"Seleccionar Tipo de Empleado"}
                    onChange={handleChangeType}
                  />
                </div>
              </div>
              <div className="py-6 flex justify-center items-center rounded-b border-t border-gray-200">
                <Button onHandleReset={() => setType(null)} loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
