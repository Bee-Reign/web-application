import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Button from "@components/Button";
import { updateRawMaterialSchema } from "@schema/rawMaterialSchema";
import { updateRawMaterial } from "@service/api/rawMaterial";
import { logError } from "@utils/logError";

export default function EditProfile({ rawMaterial }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      code: formData.get("code").toLocaleLowerCase(),
      name: formData.get("name").toLocaleLowerCase(),
    };
    const { error } = await updateRawMaterialSchema.validate(data);

    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    updateRawMaterial(rawMaterial.id, data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Materia Prima Actualizada");
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
        router.push("/raw-material");
      });
  };

  return (
    <form className="mt-5" ref={formRef} onSubmit={handleSubmit}>
      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          name="code"
          type="text"
          defaultValue={rawMaterial?.code}
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Código "
          maxLength={12}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          name="name"
          type="text"
          defaultValue={rawMaterial?.name}
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Nombre *"
          maxLength={100}
        />
      </div>

      <Button loading={loading} />
    </form>
  );
}
