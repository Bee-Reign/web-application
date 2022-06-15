import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  ClipboardListIcon,
  HomeIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { toast } from "react-toastify";
import Select from "react-select";

import capitalize from "@utils/capitalize";
import { checkId } from "@schema/productBatchSchema";
import { getProductForOutput } from "@service/api/productBatch";
import { createSchema } from "@schema/productOutputSchema";
import { addProductOutput } from "@service/api/productOutput";
import Loading from "@components/Animation/Loading";
import CheckPermission from "@utils/checkPermission";
import { logError } from "@utils/logError";
import SearchProductBatch from "@components/Modal/SearchProductBatch";
import { SearchIcon } from "@heroicons/react/solid";

const Output = () => {
  CheckPermission("/product-output");
  const formRef = useRef(null);
  const [batch, setBatch] = useState("");
  const [type, setType] = useState("CONTADO");
  const [total, setTotal] = useState(0);
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const typeOptions = [
    { value: "CONTADO", label: "CONTADO" },
    { value: "CRÉDITO", label: "CRÉDITO" },
  ];

  const handleChangeType = (value) => {
    setType(value.value);
  };

  async function handleKeyPress(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
      const { error } = await checkId.validate({ id: batch });
      if (error) {
        toast.error("El código de lote del producto no es válido");
        setBatch("");
        return;
      }
      getProductForOutput(batch)
        .then((result) => {
          addBatch(result);
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

  async function addBatch(batch) {
    batch.quantityUsed = 1;
    batch.price = batch.unitCost;
    batch.total = batch.quantityUsed * batch.price;
    const list = batches;
    list.map((item) => {
      if (batch == item.id) {
        toast.error("Ese producto ya está en la lista");
        return;
      }
    });
    list.push(batch);
    setBatches(list);
    updateTotal();
  }

  const handleDelete = async (index, e) => {
    setBatches(batches.filter((item, i) => i !== index));
    toast.info("Producto elimiando de la lista");
  };

  function updateTotal() {
    let total = 0.0;
    const list = batches;
    list.map((item) => {
      total += item.total;
    });
    setTotal(total.toFixed(2));
  }

  const changeQuantity = (value, index) => {
    const list = batches;
    list[index].quantityUsed = value;
    list[index].total = list[index].quantityUsed * list[index].price;
    setBatches(list);
    updateTotal();
  };

  const changePrice = (value, index) => {
    const list = batches;
    list[index].price = value;
    list[index].total = list[index].quantityUsed * list[index].price;
    setBatches(list);
    updateTotal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      amount: total,
      typeOfSale: type,
      batches: batches,
    };
    const { error } = await createSchema.validate(data);
    if (error) {
      toast.error("Los campos con ( * ) son necesarios");
      setLoading(false);
      return null;
    }
    addProductOutput(data)
      .then((response) => {
        toast.success("Salida de producto Registrada");
        setBatches([]);
        setTotal(0);
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
        <title>Salida de Productos</title>
      </Head>
      <SearchProductBatch
        showModal={search}
        onClick={(value) => addBatch(value)}
        onShowModalChange={(value) => setSearch(value)}
      />
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Registrar Salida
          </div>
        </div>
        <Link href="/product-output/history">
          <a>
            <ClipboardListIcon className="w-10 bg-gray-500 rounded-3xl text-white xl:hidden" />
            <button
              type="button"
              className="hidden xl:inline-block px-6 py-2.5 bg-gray-500 text-white font-medium uppercase text-sm rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg transition"
            >
              Historial de Salidas
            </button>
          </a>
        </Link>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Salida de Productos</h2>
        <form className="mt-5" ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-5 mx-auto w-full flex md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <input
              value={batch}
              type="search"
              autoFocus
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Escanear Lote..."
              onKeyPress={handleKeyPress}
              onChange={(e) => setBatch(e.target.value)}
            />
            <SearchIcon className="pl-2 w-12" onClick={() => setSearch(true)} />
          </div>

          <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <Select
              defaultValue={typeOptions[0]}
              onChange={handleChangeType}
              options={typeOptions}
              isSearchable={false}
            />
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
                        >
                          Borrar
                        </th>
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
                          Nombre del Producto
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
                          Costo del producto
                        </th>
                        <th
                          scope="col"
                          className="font-mono text-black px-6 py-4 border-r"
                        >
                          Cantidad a salir
                        </th>
                        <th
                          scope="col"
                          className="font-mono text-black px-6 py-4 border-r"
                        >
                          Precio
                        </th>
                        <th
                          scope="col"
                          className="font-mono text-black px-6 py-4 border-r"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map((data, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 flex justify-center items-center py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
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
                            {capitalize(data.product.name)}
                          </td>
                          <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            {data.stock}
                          </td>
                          <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            ${data.unitCost}
                          </td>
                          <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            <div className="mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
                              <input
                                type="number"
                                step="1"
                                min="1"
                                defaultValue={1}
                                max={data.stock}
                                className="form-control block w-full px-1 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Cantidad (*)"
                                onChange={(e) =>
                                  changeQuantity(e.target.value, index)
                                }
                              />
                            </div>
                          </td>
                          <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            <div className="mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
                              <input
                                type="number"
                                step="0.01"
                                min={data.unitCost}
                                defaultValue={data.unitCost}
                                className="form-control block w-full px-1 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Precio (*)"
                                onChange={(e) =>
                                  changePrice(e.target.value, index)
                                }
                              />
                            </div>
                          </td>
                          <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                            ${data.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <h3 className="text-lg font-mono">
              Total: <span className="font-bold">${total}</span>
            </h3>
          </div>

          <section>
            {loading === true ? (
              <Loading />
            ) : (
              <>
                <button
                  type="submit"
                  className="px-14 py-4 bg-beereign_yellow text-yellow-100 font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Registrar
                </button>
              </>
            )}
          </section>
        </form>
      </section>
    </>
  );
};

export default Output;
