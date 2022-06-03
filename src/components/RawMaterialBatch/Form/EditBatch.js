import { useRef, useState } from "react";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";
import { useRouter } from "next/router";

import { updateSchema } from "@schema/rawMaterialBatchSchema";
import { updateRawMaterialBatch } from "@service/api/rawMaterialBatch";
import { getAllRawMaterials } from "@service/api/rawMaterial";
import { getAllWarehouses } from "@service/api/warehouse";
import Button from "@components/Button";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";

export default function EditBatch({ batch }) {
  const router = useRouter();
  const formRef = useRef(null);
  const [rawMaterial, setRawMaterial] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  let query = "";

  const getRawMaterials = () => {
    return getAllRawMaterials(query)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        logError(err);
      });
  };

  const getWarehouses = () => {
    return getAllWarehouses(query)
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

  const handleChangeRawMaterial = (value) => {
    setRawMaterial(value.id);
    query = "";
  };
  const handleChangeWarehouse = (value) => {
    setWarehouse(value.id);
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
      rawMaterialId: rawMaterial ? rawMaterial : batch?.rawMaterial.id,
      warehouseId: warehouse ? warehouse : batch?.warehouse.id,
      entryDate: formData.get("entryDate"),
      expirationDate: formData.get("expirationDate")
        ? new Date(formData.get("expirationDate")).toISOString()
        : null,
      measurement: formData.get("measurement"),
      quantity: Number(formData.get("quantity")),
      stock: Number(formData.get("stock")),
      unitCost: Number(formData.get("unitCost")),
    };
    const { error } = await updateSchema.validate(data);
    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    updateRawMaterialBatch(batch?.id, data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Lote Actualizado");
        router.push("/raw-material-batch");
      })
      .catch((err) => {
        console.log(err);
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="mt-5" ref={formRef} onSubmit={handleSubmit}>
      <label className="font-serif" htmlFor="quantity">
        Materia Prima:
      </label>
      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <AsyncSelect
          className="form-control block w-full py-1 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
          styles={customStyles}
          getOptionLabel={(e) => capitalize(e.name)}
          getOptionValue={(e) => e.id}
          loadOptions={getRawMaterials}
          cacheOptions
          onInputChange={onInputChange}
          defaultOptions
          placeholder={batch?.rawMaterial.name}
          onChange={handleChangeRawMaterial}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <label className="font-serif" htmlFor="quantity">
          Bodega:
        </label>
        <AsyncSelect
          className="form-control block w-full py-1 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
          styles={customStyles}
          getOptionLabel={(e) => capitalize(e.name)}
          getOptionValue={(e) => e.id}
          loadOptions={getWarehouses}
          cacheOptions
          onInputChange={onInputChange}
          defaultOptions
          placeholder={batch?.warehouse.name}
          onChange={handleChangeWarehouse}
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <label className="font-serif" htmlFor="entryDate">
          Fecha de Entrada
        </label>
        <input
          name="entryDate"
          type="date"
          defaultValue={batch?.entryDate}
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Fecha de Entrada *"
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <label className="font-serif" htmlFor="expirationDate">
          Fecha de Expiración
        </label>
        <input
          name="expirationDate"
          type="date"
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Fecha de Expiración "
          defaultValue={
            batch?.expirationDate !== "does not expire"
              ? batch?.expirationDate
              : ""
          }
        />
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <label className="font-serif" htmlFor="quantity">
          Cantidad Ingresada:
        </label>
        <div className="flex">
          <input
            name="quantity"
            type="number"
            step={0.1}
            min={0.1}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Cantidad *"
            defaultValue={batch?.quantity}
          />
          <select
            name="measurement"
            placeholder="Unidad de Medidad"
            defaultValue={batch?.measurement}
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
      </div>

      <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <label className="font-serif" htmlFor="stock">
          Cantidad Disponible:
        </label>
        <input
          name="stock"
          type="number"
          step={0.1}
          min={0.1}
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Cantidad *"
          defaultValue={batch?.stock}
        />
      </div>

      <div className="mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
        <label className="font-serif" htmlFor="unitCost">
          Costo Unitario:
        </label>
        <input
          name="unitCost"
          type="number"
          step={0.01}
          min={0.01}
          className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          placeholder="Costo Unitario *"
          defaultValue={batch?.unitCost}
        />
      </div>

      <Button loading={loading} />
    </form>
  );
}
