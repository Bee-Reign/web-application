import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { XMarkIcon } from "@heroicons/react/24/solid";
import AsyncSelect from "react-select/async";

import { updateBatchSchema } from "application/packing/schema";
import { updateBatch } from "application/packing/service";
import { getAllWarehouses } from "application/warehouse/service";
import Button from "application/common/button/normal";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";

export default function EditProductBatchModal({
  showModal,
  onShowModalChange,
  batch,
  onEdit,
}) {
  const formRef = useRef(null);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  let warehouseQuery = "";

  if (showModal === false) return <></>;

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

  const handleClose = () => {
    setWarehouse(null);
    onShowModalChange(false);
  };

  const handleReset = () => {
    setWarehouse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      warehouseId: warehouse ? warehouse?.id : batch?.packing.warehouse.id,
      entryDate: formData.get("entryDate"),
      expirationDate: formData.get("expirationDate")
        ? new Date(formData.get("expirationDate")).toISOString()
        : null,
      stock: Number(formData.get("stock")),
      unitCost: Number(formData.get("unitCost")),
    };
    const { error } = await updateBatchSchema.validate(data);
    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    updateBatch(batch?.id, data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Lote de producto actualizado");
        onEdit();
        handleClose();
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3>Editar lote de producto</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <XMarkIcon className="w-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
                    producto
                  </label>
                  <div className="flex">
                    <input
                      disabled
                      className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                      value={capitalize(batch?.packing.product.name)}
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
                    Bodega
                  </label>
                  <AsyncSelect
                    value={warehouse}
                    styles={customStyles}
                    getOptionLabel={(e) => capitalize(e.name)}
                    getOptionValue={(e) => e.id}
                    loadOptions={getWarehouses}
                    cacheOptions
                    onInputChange={onInputChange}
                    defaultOptions
                    placeholder={capitalize(batch?.packing.warehouse.name)}
                    onChange={handleChangeWarehouse}
                    className="appearance-none block w-full text-gray-900 focus-within:ring-yellow-100 focus-within:border-beereign_yellow shadow-sm border border-gray-300 rounded py-1 focus:outline-none"
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
                    defaultValue={batch?.packing.entryDate}
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
                    defaultValue={
                      batch?.packing.expirationDate !== "does not expire"
                        ? batch?.packing.expirationDate
                        : ""
                    }
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
                    Stock
                  </label>
                  <div className="flex">
                    {batch?.stock > 0 ? (
                      <div className="flex">
                        <input
                          name="stock"
                          className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                          placeholder=""
                          defaultValue={batch?.stock}
                        />
                        <input
                          disabled
                          className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                          value={"UNIDADES"}
                        />
                      </div>
                    ) : (
                      <div className="flex">
                        <input
                          name="stock"
                          className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                          disabled
                          defaultValue={batch?.stock}
                        />
                        <input
                          disabled
                          className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                          value={"UNIDADES"}
                        />
                      </div>
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
                    defaultValue={batch?.unitCost}
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
  );
}
