import { useState, useRef } from "react";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

import { updateProfileSchema, updateLoginSchema } from "application/employee/schema";
import { getAllTypesOfEmployee } from "application/employee/type/service";
import { updateEmployee } from "application/employee/service";
import Button from "application/common/button/normal";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";

export default function EmployeeUpdateForm({
  profile,
  employee,
  onHandleClose,
  onEdit,
}) {
  const formRef = useRef(null);
  const [typeOfEmployee, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  let typeQuery = "";

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
    if (profile === true) {
      const { error } = await updateProfileSchema.validate(data);
      const data = {
        name: formData.get("name").toLocaleLowerCase(),
        lastName: formData.get("lastName").toLocaleLowerCase(),
        cellPhone: formData.get("cellPhone").toLocaleLowerCase(),
        typeOfEmployeeId: typeOfEmployee
          ? typeOfEmployee?.id
          : employee?.typeOfEmployee.id,
      };
      if (error) {
        toast.error("" + error);
        setLoading(false);
        return null;
      }
      updateEmployee(employee.id, "profile", data)
        .then((response) => {
          formRef.current.reset();
          toast.success("Empleado actualizado");
          onEdit();
          setType(null);
          onHandleClose();
        })
        .catch((err) => {
          logError(err);
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }
    const data = {
      email: formData.get("email").toLocaleLowerCase(),
      password: formData.get("password"),
    };
    const { error } = await updateLoginSchema.validate(data);
    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    updateEmployee(employee.id, "acces", data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Empleado Actualizado");
        onEdit();
        onHandleClose();
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form className="w-full" ref={formRef} onSubmit={handleSubmit}>
      <div className="grid grid-cols-6 gap-6">
        <div
          className={`${
            profile === true ? "col-span-6 sm:col-span-3" : "hidden"
          }`}
        >
          <label
            htmlFor="name"
            className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
          >
            Nombre
          </label>
          <input
            type="text"
            name="name"
            defaultValue={employee?.name}
            className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            placeholder="Jhon"
            maxLength={20}
          />
        </div>
        <div
          className={`${
            profile === true ? "col-span-6 sm:col-span-3" : "hidden"
          }`}
        >
          <label
            htmlFor="lastName"
            className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
          >
            Apellido
          </label>
          <input
            type="text"
            name="lastName"
            defaultValue={employee?.lastName}
            className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            placeholder="Doe"
            maxLength={20}
          />
        </div>
        <div
          className={`${
            profile === true ? "col-span-6 sm:col-span-3" : "hidden"
          }`}
        >
          <label
            htmlFor="cellPhone"
            className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
          >
            Celular
          </label>
          <input
            type="text"
            name="cellPhone"
            defaultValue={employee?.cellPhone}
            className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            placeholder="+507 0450 0898"
            maxLength={20}
          />
        </div>
        <div
          className={`${
            profile === true ? "col-span-6 sm:col-span-3" : "hidden"
          }`}
        >
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
            placeholder={capitalize(employee?.typeOfEmployee.name, true)}
            onChange={handleChangeType}
          />
        </div>
        <div
          className={`${
            profile === false ? "col-span-6 sm:col-span-3" : "hidden"
          }`}
        >
          <label
            htmlFor="email"
            className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            defaultValue={employee?.email}
            className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            placeholder="example@my-company.com"
          />
        </div>
        <div
          className={`${
            profile === false ? "col-span-6 sm:col-span-3" : "hidden"
          }`}
        >
          <label
            htmlFor="password"
            className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            defaultValue={""}
            className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            placeholder="example-5@HA7Byh"
            minLength={8}
            maxLength={60}
          />
        </div>
      </div>
      <div className="py-6 flex justify-center items-center rounded-b border-t border-gray-200">
        <Button onHandleReset={() => setType(null)} loading={loading} />
      </div>
    </form>
  );
}
