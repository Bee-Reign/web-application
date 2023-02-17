import { useRef, useState } from "react";
import { toast } from "react-toastify";
import AsyncSelect from "react-select/async";

import { newSchema } from "application/rawMaterial/batch/schema";
import { addRawMaterialBatch } from "application/rawMaterial/batch/service";
import { getRawMaterialByCode } from "application/rawMaterial/service";
import { getAllWarehouses } from "application/warehouse/service";
import Button from "application/common/button/normal";
import PrintLabel from "application/components/printLabel";
import SearchRawMaterial from "application/components/searchRawMaterial";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";
import { TableCellsIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function AddRawMaterialBatch({ showModal, onShowModalChange }) {
  const formRef = useRef(null);
  const [rawMaterial, setRawMaterial] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [printLabel, setPrintLabel] = useState(false);
  const [search, setSearch] = useState(false);
  const [RMQ, setRMQ] = useState(""); //Raw Material Query
  const [item, setItem] = useState({});
  let warehouseQuery = "";

  if (showModal === false) return <></>;

  const handleClose = () => {
    onShowModalChange(false);
  };

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

  const handleReset = () => {
    setRawMaterial(null);
    setWarehouse(null);
  };

  const getWarehouses = () => {
    return getAllWarehouses(warehouseQuery)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        logError(err);
      });
  };

  const onInputChange = (value) => {
    warehouseQuery = value.toLocaleLowerCase();
  };

  const handleChangeWarehouse = (value) => {
    setWarehouse(value);
    warehouseQuery = "";
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
      rawMaterialId: rawMaterial ? rawMaterial?.id : null,
      warehouseId: warehouse ? warehouse?.id : null,
      entryDate: formData.get("entryDate"),
      expirationDate: formData.get("expirationDate")
        ? new Date(formData.get("expirationDate")).toISOString()
        : null,
      quantity: Number(formData.get("quantity")),
      unitCost: Number(formData.get("unitCost")),
    };
    const { error } = await newSchema.validate(data);
    if (error) {
      toast.error("" + error);
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
      <PrintLabel
        showModal={printLabel}
        item={item}
        onShowLabelChange={(value) => setPrintLabel(value)}
      />
      <SearchRawMaterial
        showModal={search}
        onClick={(value) => setRawMaterial(value)}
        onShowModalChange={(value) => setSearch(value)}
      />
      <section className="z-40 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
        <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
          <div className="relative bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between items-start p-5 rounded-t border-b">
              <div>
                <h3 className="font-medium text-lg">
                  Entrada de materia prima
                </h3>
                <p className="pt-2 text-sm text-gray-400">
                  Esta acción registrará el lote de materia prima, el cual
                  tendrá un número único que será definido automáticamente.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <XMarkIcon className="w-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form className="w-full" ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
                      Materia prima
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={RMQ}
                        autoFocus
                        onChange={(e) => setRMQ(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        placeholder={
                          rawMaterial ? rawMaterial.name : "Esperando scanner"
                        }
                      />
                      <TableCellsIcon
                        className="pl-2 w-12 text-gray-700 mb-3 hover:text-beereign_yellow hover:scale-105 transition-transform"
                        onClick={() => setSearch(true)}
                      />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
                      Bodega
                    </label>
                    <AsyncSelect
                      value={warehouse}
                      className="appearance-none block w-full text-gray-900 focus-within:ring-yellow-100 focus-within:border-beereign_yellow shadow-sm border border-gray-300 rounded py-1 focus:outline-none"
                      styles={customStyles}
                      getOptionLabel={(e) => capitalize(e.name)}
                      getOptionValue={(e) => e.id}
                      loadOptions={getWarehouses}
                      cacheOptions
                      onInputChange={onInputChange}
                      defaultOptions
                      placeholder={"Seleccionar bodega"}
                      onChange={handleChangeWarehouse}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="entryDate"
                      required
                      className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    >
                      Fecha de entrada
                    </label>
                    <input
                      name="entryDate"
                      type="date"
                      defaultValue={toDay}
                      className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="expirationDate"
                      className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    >
                      Fecha de expiración
                    </label>
                    <input
                      name="expirationDate"
                      type="date"
                      className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="quantity"
                      className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    >
                      Cantidad
                    </label>
                    <div className="flex">
                      <input
                        name="quantity"
                        type="number"
                        step={0.01}
                        min={0.01}
                        className={`${
                          rawMaterial ? "mr-1" : ""
                        } appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none`}
                        placeholder="0"
                      />
                      {rawMaterial ? (
                        <input
                          readOnly
                          className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                          value={rawMaterial?.measurement}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="unitCost"
                      className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    >
                      Costo unitario
                    </label>
                    <input
                      name="unitCost"
                      type="number"
                      step={0.01}
                      min={0.01}
                      className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="col-span-6 sm:col-full flex justify-center items-center">
                    <Button
                      onHandleReset={() => handleReset()}
                      loading={loading}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
