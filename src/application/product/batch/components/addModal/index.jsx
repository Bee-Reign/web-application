import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { XMarkIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import AsyncSelect from "react-select/async";

import { manualRegistration } from "application/packing/schema";
import { addBatch } from "application/packing/service";
import { getProductByBarcode } from "application/product/service";
import { getAllWarehouses } from "application/warehouse/service";
import { logError } from "@utils/logError";
import SearchProduct from "application/components/searchProduct";
import Button from "application/common/button/normal";
import capitalize from "@utils/capitalize";

export default function AddProductBatchModal({
  showModal,
  onShowModalChange,
  onAdd,
  onPrint,
}) {
  const formRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [productQuery, setPDQ] = useState("");
  let warehouseQuery = "";

  if (showModal === false) return <></>;

  const toDay = new Date().toISOString().substring(0, 10);

  async function handleKeyPressInProduct(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
      getProductByBarcode(productQuery)
        .then((result) => {
          setProduct(result);
        })
        .catch((err) => {
          logError(err);
        })
        .finally(() => {
          setPDQ("");
        });
      return;
    }
  }

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

  const handleReset = () => {
    setProduct(null);
    setWarehouse(null);
  };

  const handleClose = () => {
    onShowModalChange(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      productId: product ? product?.id : null,
      warehouseId: warehouse ? warehouse?.id : null,
      entryDate: formData.get("entryDate"),
      expirationDate: formData.get("expirationDate")
        ? new Date(formData.get("expirationDate")).toISOString()
        : null,
      quantity: formData.get("quantity"),
      unitCost: formData.get("unitCost"),
    };
    const { error } = await manualRegistration.validate(data);
    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    addBatch(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Lote de producto registrado");
        handleClose();
        onAdd();
        onPrint({
          id: response.id,
          name: product.name,
          time: response.createdAt,
        });
        setProduct(null);
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
      <SearchProduct
        showModal={search}
        onClick={(value) => setProduct(value)}
        onShowModalChange={(value) => setSearch(value)}
      />
      <section className="z-30 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
        <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
          <div className="relative bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between items-start p-5 rounded-t border-b">
              <div>
                <h3 className="font-medium text-lg">
                  Agregar lote de producto
                </h3>
                <p className="pt-2 text-sm text-gray-400">
                  Esta acción registrará el lote de producto, pero no contendrá
                  información sobre las materias primas utilizadas.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <XMarkIcon className="w-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form className="w-full" ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
                      Producto
                    </label>
                    <div className="flex">
                      <input
                        type="search"
                        autoFocus
                        value={productQuery}
                        onChange={(e) => setPDQ(e.target.value)}
                        onKeyPress={handleKeyPressInProduct}
                        className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        placeholder={
                          product ? product?.name : "Esperando scanner"
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
                      styles={customStyles}
                      getOptionLabel={(e) => capitalize(e.name)}
                      getOptionValue={(e) => e.id}
                      loadOptions={getWarehouses}
                      cacheOptions
                      onInputChange={onInputChange}
                      defaultOptions
                      placeholder={"Seleccionar bodega"}
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
                      defaultValue={toDay}
                      className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="expirationDate"
                      className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    >
                      Fecha de expiración del producto
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
                        type="number"
                        name="quantity"
                        step={1}
                        min={1}
                        required
                        className="mr-1 appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                      />
                      <input
                        disabled
                        className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        value={"unidades"}
                      />
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
                      type="number"
                      name="unitCost"
                      step={0.01}
                      min={0.01}
                      required
                      className="mr-1 appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    />
                  </div>
                </div>
                <div className="pt-6 flex justify-center items-center rounded-b border-t border-gray-200">
                  <Button
                    onHandleReset={() => handleReset()}
                    loading={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
