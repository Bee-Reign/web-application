import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { TrashIcon, ViewGridIcon } from "@heroicons/react/outline";
import { CameraIcon } from "@heroicons/react/solid";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";

import { updateSchema } from "@schema/productBatchSchema";
import { updateBatchSaved } from "@service/api/packing";
import { getBatchInProcessById } from "@service/api/packing";
import { getAllProducts } from "@service/api/product";
import { getAllWarehouses } from "@service/api/warehouse";
import { logError } from "@utils/errorHandler";
import capitalize from "@utils/capitalize";
import { getBatchForPacking } from "@service/api/rawMaterialBatch";
import { checkId } from "@schema/rawMaterialBatchSchema";
import Loading from "@components/Animation/Loading";

const Packing = () => {
  const formRef = useRef(null);
  const [batchData, setData] = useState(null);
  const [batch, setBatch] = useState("");
  const [unitCost, setUnitCost] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [batches, setBatches] = useState([]);
  const [product, setProduct] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let query = "";

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getResult() {
      getBatchInProcessById(id)
        .then((result) => {
          setData(result);
        })
        .catch((err) => {
          logError(err);
          router.push("/packing");
        });
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  async function handleKeyPress(e) {
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

  const getProducts = () => {
    return getAllProducts(query)
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

  const handleChangeProduct = (value) => {
    setProduct(value.id);
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

  const handleSubmit = async (save) => {
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      productId: product ? product : batchData?.product.id,
      warehouseId: warehouse ? warehouse : batchData?.warehouse.id,
      entryDate: formData.get("entryDate"),
      expirationDate: formData.get("expirationDate")
        ? new Date(formData.get("expirationDate")).toISOString()
        : null,
      quantity: Number(quantity) + batchData?.quantity,
      stock: Number(quantity) + batchData?.quantity,
      unitCost: (Number(unitCost) + Number(batchData?.unitCost)) / 2,
      isFinished: save,
      batches: batches,
    };
    const { error } = await updateSchema.validate(data);
    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    updateBatchSaved(batchData?.id, data)
      .then((response) => {
        formRef.current.reset();
        if (save === true) {
          toast.success("Envasado registrado");
          router.push("/packing");
        } else {
          toast.success("Envasado guardado");
          router.push("/packing");
        }
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
      <Head>
        <title>Envasado - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/packing">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Módulo de Envasado
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Detalle del Envasado</h2>
        <form className="mt-5" ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <AsyncSelect
              className="form-control block w-full py-1 text-left font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none"
              styles={customStyles}
              getOptionLabel={(e) => capitalize(e.name)}
              getOptionValue={(e) => e.id}
              loadOptions={getProducts}
              cacheOptions
              onInputChange={onInputChange}
              defaultOptions
              placeholder={batchData?.product.name}
              onChange={handleChangeProduct}
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
              placeholder={batchData?.warehouse.name}
              onChange={handleChangeWarehouse}
            />
          </div>

          <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <label className="font-serif" htmlFor="entryDate">
              Fecha del Embalaje *
            </label>
            <input
              name="entryDate"
              type="date"
              defaultValue={batchData?.entryDate}
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>

          <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <label className="font-serif" htmlFor="expirationDate">
              Expiración del Producto
            </label>
            <input
              name="expirationDate"
              type="date"
              defaultValue={
                batchData?.expirationDate !== "does not expire"
                  ? batchData?.expirationDate
                  : ""
              }
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Fecha de Expiración "
            />
          </div>

          <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <label className="font-serif" htmlFor="expirationDate">
              Cantidad de Productos *
            </label>
            <input
              value={quantity}
              type="number"
              step={1}
              min="1"
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <p className="font-serif">
              Total de Productos Envasados:{" "}
              {Number(batchData?.quantity) + Number(quantity)}
            </p>
          </div>

          <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <input
              value={batch}
              type="search"
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Lote de Mareria Prima #"
              onKeyPress={handleKeyPress}
              onChange={(e) => setBatch(e.target.value)}
            />
            <div className="ml-2 xl:hidden">
              <CameraIcon className="w-12 text-beereign_silver" />
            </div>
          </div>

          <div className="flex flex-col mb-6">
            <div className="overflow-x-auto">
              <div className="py-2 inline-block min-w-full">
                <div className="overflow-hidden">
                  <table className="min-w-full border text-center">
                    <thead className="border-b">
                      <tr>
                        <th
                          scope="col"
                          className="font-mono text-black px-6 py-4 border-r"
                        >Borrar</th>
                        <th
                          scope="col"
                          className="font-mono text-black px-6 py-4 border-r"
                        >
                          Lote #
                        </th>
                        <th
                          scope="col"
                          className="font-mono text-black px-6 py-4 border-r"
                        >
                          Materia Prima
                        </th>
                        <th
                          scope="col"
                          className="font-mono text-black px-6 py-4 border-r"
                        >
                          Cantidad Disponible
                        </th>
                        <th
                          scope="col"
                          className="font-mono text-black px-6 py-4 border-r"
                        >
                          Cantidad Usada
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map((data, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            <div
                              type="button"
                              onClick={(e) => handleDelete(index, e)}
                            >
                              <TrashIcon className="w-6 text-red-500" />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            {data.id}
                          </td>
                          <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            {capitalize(data.rawMaterial.name)}
                          </td>
                          <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            ${data.unitCost}
                          </td>
                          <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            {data.stock} {data.measurement}
                          </td>
                          <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            <div className="mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                max={data.stock}
                                className="form-control block w-full px-1 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Cantidad (*)"
                                onChange={(e) =>
                                  changeQuantity(e.target.value, index)
                                }
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
          </div>

          <section>
            {loading === true ? (
              <Loading />
            ) : (
              <>
                <button
                  type="button"
                  className="px-14 py-4 bg-beereign_yellow text-yellow-100 font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={(save) => handleSubmit(true)}
                >
                  Registrar
                </button>
                <button
                  type="button"
                  className="mt-5 xl:ml-5 px-16 py-4 bg-beereign_clear text-beereign_grey font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-200 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={(save) => handleSubmit(false)}
                >
                  Guardar
                </button>
              </>
            )}
          </section>
        </form>
      </section>
    </>
  );
};

export default Packing;
