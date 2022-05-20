import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Button from "@components/Button";
import { updateProfileSchema, updateLoginSchema } from "@schema/employeeSchema";
import { updateEmployee } from "@service/api/employee";
import { logError } from "@utils/errorHandler";

export default function EditProfile({ profile, employee }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const notify = (message, type) =>
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name").toLocaleLowerCase(),
      lastName: formData.get("lastName").toLocaleLowerCase(),
      cellPhone: formData.get("cellPhone").toLocaleLowerCase(),
      typeOfEmployeeId: parseInt(formData.get("typeOfEmployeeId")),
    };
    const { error } = await updateProfileSchema.validate(data);

    if (error) {
      notify("Los campos con ( * ) son necesarios", "error");
      setLoading(false);
      return null;
    }
    updateEmployee(employee.id, "profile", data)
      .then((response) => {
        formRef.current.reset();
        notify("Empleado Actualizado", "success");
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
      notify("Los campos con ( * ) son necesarios", "error");
      setLoading(false);
      return null;
    }
    updateEmployee(employee.id, "acces", data)
      .then((response) => {
        formRef.current.reset();
        notify("Empleado Actualizado", "success");
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
            id="email"
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
            id="password"
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
            id="name"
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
            id="lastName"
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

        <div className="mb-7 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <select
            id="typeOfEmployeeId"
            name="typeOfEmployeeId"
            defaultValue={employee?.typeOfEmployeeId}
            className="form-select appearance-none block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Seleccionar Tipo de Empleado"
          >
            <option value={1}>Administrador</option>
          </select>
        </div>

        <Button loading={loading} />
      </form>
    );
  }
  return;
}
