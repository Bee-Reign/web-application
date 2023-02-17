import { useRef, useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";
import { MoonIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";

import { createSchema, suspendSchema } from "application/packing/schema";
import { addPacking, suspendPacking } from "application/packing/service";
import { getProductByBarcode } from "application/product/service";
import { getAllWarehouses } from "application/warehouse/service";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";
import { getBatchForPacking } from "application/rawMaterial/batch/service";
import { checkId } from "application/rawMaterial/batch/schema";
import Button from "application/common/button/normal";
import SearchProduct from "application/components/searchProduct";
import PrintLabel from "application/components/printLabel";

export default function AddPacking() {
  const formRef = useRef(null);
  const [batch, setBatch] = useState("");
  const [unitCost, setUnitCost] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [batches, setBatches] = useState([]);
  const [product, setProduct] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [printLabel, setPrintLabel] = useState(false);
  const [search, setSearch] = useState(false);
  const [item, setItem] = useState({});
  const [productQuery, setPDQ] = useState("");
  let warehouseQuery = "";

  const toDay = new Date().toISOString().substring(0, 10);
  async function handleKeyPressInBatch(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
      const { error } = await checkId.validate({ id: batch });
      if (error) {
        toast.error("El código de lote no es válido");
        return;
      }
      getBatchForPacking(batch)
        .then((result) => {
          result.quantityUsed = 0;
          const list = batches;
          list.map((item) => {
            if (batch == item.id) {
              toast.error("Ese lote ya está en la lista");
              throw false;
            }
          });
          list.push(result);
          setBatches(list);
        })
        .catch((error) => {
          if (error != false) {
            logError(error);
          }
        })
        .finally(() => {
          setBatch("");
        });
    }
  }

  useEffect(() => {
    updateCost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batches, quantity]);

  const handleDelete = async (index, e) => {
    setBatches(batches.filter((item, i) => i !== index));
    toast.info("Lote elimiando de la lista");
  };

  function updateCost() {
    let cost = 0.0;
    const list = batches;
    list.map((item) => {
      cost += item.unitCost * item.quantityUsed;
    });
    cost /= quantity;
    setUnitCost(cost);
  }

  const changeQuantity = (value, index) => {
    const list = batches;
    list[index].quantityUsed = value;
    setBatches(list);
    updateCost();
  };

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
    setBatch("");
    setBatches([]);
    setProduct(null);
    setQuantity(1);
    setWarehouse(null);
  };

  const handleSuspend = async () => {
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      productId: product ? product?.id : null,
      warehouseId: warehouse ? warehouse?.id : null,
      entryDate: formData.get("entryDate"),
      expirationDate: formData.get("expirationDate")
        ? new Date(formData.get("expirationDate")).toISOString()
        : null,
      quantity: quantity,
      batches: batches,
    };
    const { error } = await suspendSchema.validate(data);
    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    suspendPacking(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Envasado Suspendido");
        setQuantity(1);
        setBatches([]);
        setProduct(null);
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
      quantity: quantity,
      unitCost: unitCost,
      batches: batches,
    };
    const { error } = await createSchema.validate(data);
    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    addPacking(data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Envasado Registrado");
        setQuantity(1);
        setBatches([]);
        setItem({
          id: response.id,
          name: product.name,
          time: response.createdAt,
        });
        setPrintLabel(true);
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
      <PrintLabel
        showModal={printLabel}
        item={item}
        onShowLabelChange={(value) => setPrintLabel(value)}
      />
      <SearchProduct
        showModal={search}
        onClick={(value) => setProduct(value)}
        onShowModalChange={(value) => setSearch(value)}
      />
      <form ref={formRef} onSubmit={handleSubmit}>
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
                placeholder={product ? product?.name : "Esperando scanner"}
              />
              <MagnifyingGlassIcon
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
              Fecha del envasado
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
                value={quantity}
                type="number"
                step={1}
                min={1}
                className="mr-1 appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                readOnly
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
              Materia prima utilizada
            </label>
            <input
              value={batch}
              type="text"
              className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
              placeholder="Escanear lote de materia prima"
              onKeyPress={handleKeyPressInBatch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-b-2xl">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                    ></th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                    >
                      Nº de lote
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                    >
                      Materia prima
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                    >
                      Cantidad disponible
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                    >
                      Total de cantidad usada
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {batches.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="p-4 text-sm font-normal text-red-500 whitespace-nowrap lg:p-5">
                        <div
                          type="button"
                          onClick={(e) => handleDelete(index, e)}
                        >
                          <TrashIcon className="w-6" />
                        </div>
                      </td>
                      <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                        #{data.id}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                        {capitalize(data.rawMaterial.name)}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                        {data.stock} {data.rawMaterial.measurement}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                        <div className="flex">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            max={data.stock}
                            className="appearance-none block w-48 text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                            placeholder="0.00"
                            onChange={(e) =>
                              changeQuantity(e.target.value, index)
                            }
                          />
                          <input
                            disabled
                            className="appearance-none block w-48 text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                            value={data.rawMaterial.measurement}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Button onHandleReset={() => handleReset()} loading={loading} />
          <button
            type="button"
            onClick={handleSuspend}
            className="ml-2 inline-flex items-center py-3 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-800 sm:ml-auto shadow-md shadow-gray-300 hover:scale-105 cursor-default transition-transfor"
          >
            <MoonIcon className="w-6 mr-2" />
            Suspender
          </button>
        </div>
      </form>
    </>
  );
}
