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
import Loading from "@components/Animation/Loading";
import CheckPermission from "@utils/checkPermission";
import { logError } from "@utils/logError";

const Output = () => {
  CheckPermission("/product-output");
  const formRef = useRef(null);
  const [batch, setBatch] = useState("");
  const [type, setType] = useState("counted");
  const [total, setTotal] = useState(0);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const typeOptions = [
    { value: "counted", label: "CONTADO" },
    { value: "credit", label: "CRÉDITO" },
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
        return;
      }
      getProductForOutput(batch)
        .then((result) => {
          result.quantityUsed = 0;
          result.price = 0;
          const list = batches;
          list.map((item) => {
            if (batch == item.id) {
              toast.error("Ese producto ya está en la lista");
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

  const handleDelete = async (index, e) => {
    setBatches(batches.filter((item, i) => i !== index));
    toast.info("Producto elimiando de la lista");
  };

  function updateTotal() {
    let total = 0.0;
    const list = batches;
    list.map((item) => {
      total += item.price * item.quantityUsed;
    });
    setTotal(total);
  }

  const changeQuantity = (value, index) => {
    const list = batches;
    list[index].quantityUsed = value;
    setBatches(list);
    updateTotal();
  };

  const changePrice = (value, index) => {
    const list = batches;
    list[index].price = value;
    setBatches(list);
    updateTotal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Estamos trabajando en esto");
  };
  return (
    <>
      <Head>
        <title>Salida de Productos - BeeReign</title>
      </Head>
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
          <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <input
              value={batch}
              type="search"
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Lote de Mareria Prima #"
              onKeyPress={handleKeyPress}
              onChange={(e) => setBatch(e.target.value)}
            />
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
                                min="0"
                                className="form-control block w-full px-1 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Precio (*)"
                                onChange={(e) =>
                                  changePrice(e.target.value, index)
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

          <div className="text-right">
            <h3 className="text-lg font-mono">
              Total de Venta: <span className="font-bold">${total}</span>
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
