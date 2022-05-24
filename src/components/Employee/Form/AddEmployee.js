import { useRef, useState } from "react";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

import { newEmployeeSchema } from "@schema/employeeSchema";
import { getAllTypesOfEmployee } from "@service/api/typeOfEmployee";
import { addEmployee } from "@service/api/employee";
import Button from "@components/Button";
import { logError } from "@utils/errorHandler";
import capitalize from "@utils/capitalize";

export default function AddEmployee() {
  const formRef = useRef(null);
  const [typeOfEmployee, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  let query = "";

  const getTypesOfEmployee = () => {
    return getAllTypesOfEmployee(query)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        logError(err);
      });
  };

  const onInputChange = (value) => {
    query = value.toLocaleLowerCase();
  };

  const handleChangeType = (value) => {
    setType(value.id);
    query = "";
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
      typeOfEmployeeId: typeOfEmployee,
    };
    const { error } = await newEmployeeSchema.validate(data);

    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    addEmployee(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Empleado Registrado");
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
          id="name"
          name="name"
          type="text"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Nombre *"
          maxLength={20}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          id="lastName"
          name="lastName"
          type="text"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Apellido *"
          maxLength={20}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          id="cellPhone"
          name="cellPhone"
          type="text"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Celular"
          maxLength={20}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          id="email"
          name="email"
          type="email"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Correo Electronico *"
          maxLength={256}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          id="password"
          name="password"
          type="password"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Contraseña *"
          minLength={8}
          maxLength={60}
        />
      </div>

      <AsyncSelect
        className="form-control block w-full py-1 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
        styles={customStyles}
        getOptionLabel={(e) => capitalize(e.name)}
        getOptionValue={(e) => e.id}
        loadOptions={getTypesOfEmployee}
        onInputChange={onInputChange}
        defaultOptions
        placeholder={"Seleccionar Tipo de Empleado.. *"}
        onChange={handleChangeType}
      />

      <Button loading={loading} />
    </form>
  );
}
