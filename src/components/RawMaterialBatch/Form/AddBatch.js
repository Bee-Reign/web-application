import { useRef, useState } from "react";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

import { newSchema } from "@schema/rawMaterialBatchSchema";
import { addRawMaterialBatch } from "@service/api/rawMaterialBatch";
import { getAllRawMaterials } from "@service/api/rawMaterial";
import { getAllWarehouses } from "@service/api/warehouse";
import Button from "@components/Button";
import PrintModal from "@components/Modal/PrintModal";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";

export default function AddBatch() {
  const formRef = useRef(null);
  const [rawMaterial, setRawMaterial] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [printLabel, setPrintLabel] = useState(false);
  const [item, setItem] = useState({});
  let query = "";

  const toDay = new Date().toISOString().substring(0, 10);
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
    setRawMaterial(value);
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
      rawMaterialId: rawMaterial.id,
      warehouseId: warehouse,
      entryDate: formData.get("entryDate"),
      expirationDate: formData.get("expirationDate")
        ? new Date(formData.get("expirationDate")).toISOString()
        : null,
      measurement: formData.get("measurement"),
      quantity: Number(formData.get("quantity")),
      unitCost: Number(formData.get("unitCost")),
    };
    const { error } = await newSchema.validate(data);
    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    addRawMaterialBatch(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Lote Registrado");
        setItem({
          id: response.id,
          name: rawMaterial.name,
          quantity: `${response.quantity} ${response.measurement}`,
        });
        setPrintLabel(true);
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <PrintModal
        showModal={printLabel}
        item={item}
        onShowLabelChange={(value) => setPrintLabel(value)}
      />
      <form className="mt-5" ref={formRef} onSubmit={handleSubmit}>
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
            placeholder={"Buscar Materia Prima... *"}
            onChange={handleChangeRawMaterial}
          />
        </div>

        <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <AsyncSelect
            className="form-control block w-full py-1 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
            styles={customStyles}
            getOptionLabel={(e) => capitalize(e.name)}
            getOptionValue={(e) => e.id}
            loadOptions={getWarehouses}
            cacheOptions
            onInputChange={onInputChange}
            defaultOptions
            placeholder={"Buscar Bodega... *"}
            onChange={handleChangeWarehouse}
          />
        </div>

        <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <label className="font-serif" htmlFor="entryDate">
            Fecha de Entrada
          </label>
          <input
            name="entryDate"
            type="date"
            defaultValue={toDay}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Fecha de Entrada *"
          />
        </div>

        <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <label className="font-serif" htmlFor="expirationDate">
            Fecha de Expiración
          </label>
          <input
            name="expirationDate"
            type="date"
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Fecha de Expiración "
          />
        </div>

        <div className="flex mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <input
            name="quantity"
            type="number"
            step={0.01}
            min={0.01}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Cantidad *"
          />
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

        <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <input
            name="unitCost"
            type="number"
            step={0.01}
            min={0.01}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Costo Unitario *"
          />
        </div>

        <Button loading={loading} />
      </form>
    </>
  );
}
