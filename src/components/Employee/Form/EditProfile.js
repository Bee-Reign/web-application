import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

import Button from "@components/Button";
import { updateProfileSchema, updateLoginSchema } from "@schema/employeeSchema";
import { getAllTypesOfEmployee } from "@service/api/typeOfEmployee";
import { updateEmployee } from "@service/api/employee";
import { logError } from "@utils/errorHandler";
import capitalize from "@utils/capitalize";

export default function EditProfile(props) {
  const { profile, employee } = props;
  const formRef = useRef(null);
  const [typeOfEmployee, setType] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
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

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name").toLocaleLowerCase(),
      lastName: formData.get("lastName").toLocaleLowerCase(),
      cellPhone: formData.get("cellPhone").toLocaleLowerCase(),
      typeOfEmployeeId: typeOfEmployee
        ? typeOfEmployee
        : employee?.typeOfEmployee.id,
    };
    const { error } = await updateProfileSchema.validate(data);

    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    updateEmployee(employee.id, "profile", data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Empleado Actualizado");
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
        router.push("/employee");
      });
  };

  const handleAccesSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      email: formData.get("email").toLocaleLowerCase(),
      password: formData.get("password"),
    };
    const { error } = await updateLoginSchema.validate(data);
    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    updateEmployee(employee.id, "acces", data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Empleado Actualizado");
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
        router.push("/employee");
      });
  };

  if (profile === false) {
    return (
      <form className="mt-5" ref={formRef} onSubmit={handleAccesSubmit}>
        <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <input
            name="email"
            type="email"
            defaultValue={employee?.email}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Correo Electronico *"
            maxLength={256}
          />
        </div>

        <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <input
            name="password"
            type="password"
            defaultValue={""}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Contraseña *"
            minLength={8}
            maxLength={60}
          />
        </div>

        <Button loading={loading} />
      </form>
    );
  }
  if (profile === true) {
    return (
      <form className="mt-5" ref={formRef} onSubmit={handleProfileSubmit}>
        <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <input
            name="name"
            type="text"
            defaultValue={employee?.name}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Nombre *"
            maxLength={20}
          />
        </div>

        <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <input
            name="lastName"
            type="text"
            defaultValue={employee?.lastName}
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
            defaultValue={employee?.cellPhone}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Celular"
            maxLength={20}
          />
        </div>

        <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <AsyncSelect
            className="form-control block w-full py-1 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
            styles={customStyles}
            getOptionLabel={(e) => capitalize(e.name)}
            getOptionValue={(e) => e.id}
            loadOptions={getTypesOfEmployee}
            onInputChange={onInputChange}
            defaultOptions
            placeholder={employee?.typeOfEmployee.name}
            onChange={handleChangeType}
          />
        </div>

        <Button loading={loading} />
      </form>
    );
  }
  return;
}
