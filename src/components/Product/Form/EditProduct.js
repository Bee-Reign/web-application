import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Button from "@components/Button";
import { updateSchema } from "@schema/productSchema";
import { updateProduct } from "@service/api/product";
import { logError } from "@utils/logError";

export default function EditProduct({ product }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleKeyPress(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      barcode: formData.get("barcode").toLocaleLowerCase(),
      name: formData.get("name").toLocaleLowerCase(),
      description: formData.get("description").toLocaleLowerCase(),
    };
    const { error } = await updateSchema.validate(data);

    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    updateProduct(product.id, data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Producto Atualizado");
        router.push("/product");
      })
      .catch((err) => {
        if (logError(err) === 409) toast.error("Código de barra ya registrado");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="mt-5" ref={formRef} onSubmit={handleSubmit}>
      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          name="barcode"
          type="text"
          defaultValue={product?.barcode}
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Código de  Barra *"
          maxLength={128}
          onKeyPress={handleKeyPress}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          name="name"
          type="text"
          defaultValue={product?.name}
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Nombre del producto *"
          maxLength={100}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <input
          name="description"
          type="text"
          defaultValue={product?.description}
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Descripción"
          maxLength={255}
        />
      </div>

      <Button loading={loading} />
    </form>
  );
}
