import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Head from "next/head";
import { HomeIcon, TrashIcon } from "@heroicons/react/outline";
import { CameraIcon } from "@heroicons/react/solid";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";

import { getAllProducts } from "@service/api/product";
import { getBatch } from "@service/api/rawMaterialBatch";
import { checkId } from "@schema/rawMaterialBatchSchema";
import Button from "@components/Button";
import { logError } from "@utils/errorHandler";
import capitalize from "@utils/capitalize";

const Packing = () => {
  const [batch, setBatch] = useState("");
  const [unitCost, setUnitCost] = useState(null);
  const [batches, setBatches] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  let query = "";

  async function handleKeyPress(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
      const { error } = await checkId.validate({ id: batch });
      if (error) {
        toast.error("El código de lote no es válido");
        return;
      }
      getBatch(batch)
        .then((result) => {
          result.quantityUsed = 0;
          const list = batches;
          list.map((item) => {
            if (batch == item.id) {
              toast.error("El lote introducido ya está en la lista");
              throw false;
            }
          });
          list.push(result);
          setBatches(list);
        })
        .catch((error) => {
          if (error != false) {
            if (logError(error) === 404) {
              toast.error("No existe un lote con ese código");
            }
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
  }, [batches]);

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
    setUnitCost(cost.toFixed(2));
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

  const onInputChange = (value) => {
    query = value.toLocaleLowerCase();
  };

  const handleChangeProduct = (value) => {
    setProduct(value.id);
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
    console.log("OK");
  };
  return (
    <>
      <Head>
        <title>Envasado - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Módulo de Envasado
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Detalle del envasado</h2>
        <form className="mt-5" onSubmit={handleSubmit}>
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
              placeholder={"Buscar Producto a Envasar... *"}
              onChange={handleChangeProduct}
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

          <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <input
              name="amount"
              type="number"
              min="1"
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Cantidad a Envasar (*)"
            />
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
                        ></th>
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
                          Costo Unitario
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
            <div className="text-right">
              <h3 className="text-lg font-mono">
                Costo Unitario del Producto:{" "}
                <span className="font-bold">${unitCost}</span>
              </h3>
            </div>
          </div>
          <Button loading={loading} />
        </form>
      </section>
    </>
  );
};

export default Packing;
