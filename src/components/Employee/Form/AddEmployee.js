import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { newEmployeeSchema } from "@schema/employeeSchema";
import { addEmployee } from "@service/api/employee";
import Button from "@components/Button";
import { logError } from "@utils/errorHandler";

export default function AddEmployee() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
      typeOfEmployeeId: parseInt(formData.get("typeOfEmployeeId")),
    };
    const { error } = await newEmployeeSchema.validate(data);

    if (error) {
      notify("Los campos con ( * ) son necesarios", "error");
      setLoading(false);
      return null;
    }
    addEmployee(data)
      .then((response) => {
        formRef.current.reset();
        notify("Empleado Registrado", "success");
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

      <div className="mb-7 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <select
          id="typeOfEmployeeId"
          name="typeOfEmployeeId"
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
