import { useRef, useState } from "react";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

import { newSchema } from "@schema/rawMaterialBatchSchema";
import { addRawMaterialBatch } from "@service/api/rawMaterialBatch";
import { getRawMaterialByCode } from "@service/api/rawMaterial";
import { getAllWarehouses } from "@service/api/warehouse";
import Button from "@components/Button";
import PrintModal from "@components/Modal/PrintModal";
import SearchRawMaterial from "@components/Modal/SearchRawMaterial";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";
import { SearchIcon } from "@heroicons/react/solid";

export default function AddBatch() {
  const formRef = useRef(null);
  const [rawMaterial, setRawMaterial] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [printLabel, setPrintLabel] = useState(false);
  const [search, setSearch] = useState(false);
  const [RMQ, setRMQ] = useState(""); //Raw Material Query
  const [item, setItem] = useState({});
  let query = "";

  const toDay = new Date().toISOString().substring(0, 10);

  async function handleKeyPress(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
      getRawMaterialByCode(RMQ.toLowerCase())
        .then((result) => {
          setRawMaterial(result);
        })
        .catch((err) => {
          logError(err);
        })
        .finally(() => {
          setRMQ("");
        });
      return;
    }
  }

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
      rawMaterialId: rawMaterial?.id ? rawMaterial.id : null,
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
      toast.error("*" + error);
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
          time: response.createdAt,
        });
        setPrintLabel(true);
        setRawMaterial(null);
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
      <SearchRawMaterial
        showModal={search}
        onClick={(value) => setRawMaterial(value)}
        onShowModalChange={(value) => setSearch(value)}
      />
      <form className="mt-5" ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-5 mx-auto w-full flex md:w-4/5 xl:w-9/12 2xl:w-3/5">
          <input
            type="search"
            value={RMQ}
            onChange={(e) => setRMQ(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={
              rawMaterial ? rawMaterial.name : "Buscar Materia Prima..."
            }
          />
          <SearchIcon className="pl-2 w-12" onClick={() => setSearch(true)} />
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
