import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { newRawMaterialSchema } from "@schema/rawMaterialSchema";
import { addRawMaterial } from "@service/api/rawMaterial";
import Button from "@components/Button";
import { logError } from "@utils/logError";

export default function AddRawMaterial() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      code: formData.get("code").toLocaleLowerCase(),
      name: formData.get("name").toLocaleLowerCase(),
      measurement: formData.get("measurement"),
    };
    const { error } = await newRawMaterialSchema.validate(data);

    if (error) {
      toast.error("*" + error);
      setLoading(false);
      return null;
    }
    addRawMaterial(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Materia Prima Registrada");
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
          name="code"
          type="text"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Código "
          maxLength={12}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          name="name"
          type="text"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Nombre *"
          maxLength={50}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <select
          name="measurement"
          placeholder="Unidad de Medidad"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="GALONES">GALONES</option>
          <option value="GRAMOS">GRAMOS</option>
          <option value="KILOGRAMOS">KILOGRAMOS</option>
          <option value="LIBRAS">LIBRAS</option>
          <option value="LITROS">LITROS</option>
          <option value="ONZAS">ONZAS</option>
          <option value="UNIDADES">UNIDADES</option>
        </select>
      </div>

      <Button loading={loading} />
    </form>
  );
}
