import { useRef, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { HomeIcon, TrashIcon } from "@heroicons/react/outline";
import { CameraIcon } from "@heroicons/react/solid";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";

import { getAllProducts } from "@service/api/product";
import { getBatch } from "@service/api/rawMaterialBatch";
import Button from "@components/Button";
import { logError } from "@utils/errorHandler";
import capitalize from "@utils/capitalize";

const Packing = () => {
  const [batch, setBatch] = useState("");
  const [unitCost, setUnitCost] = useState(0.0);
  const [batches, setBatches] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  let query = "";

  async function handleKeyPress(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
      getBatch(batch)
        .then((result) => {
          result.quantityUsed = 0;
          const list = batches;
          console.log(list);
          list.push(result);
          setBatches(list);
        })
        .catch((error) => {
          if (logError(error) === 404) {
            toast.error("No existe un lote con ese código");
          }
        })
        .finally(() => {
          setBatch("");
        });
    }
  }

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
              <HomeIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <p className="ml-2 font-sans font-normal text-xl">
            Registrar Envasado
          </p>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-5 text-lg">Detalle del envasado</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
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
              placeholder={"Buscar Producto... *"}
              onChange={handleChangeProduct}
            />
          </div>

          <div className="mb-5 mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <input
              name="expirationDate"
              type="date"
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Fecha de Expiración "
            />
          </div>

          <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <input
              name="amount"
              type="number"
              min="1"
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Cantidad (*)"
            />
          </div>

          <div className="mb-5 flex mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
            <input
              id="batch"
              value={batch}
              type="search"
              className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="# Lote"
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
                          className="text-sm font-medium text-gray-900 px-2 py-2 border-r"
                        ></th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                        >
                          # Lote
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                        >
                          Materia Prima
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                        >
                          Costo
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                        >
                          Cantidad Disponible
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 border-r"
                        >
                          Cantidad Usada
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {batches.map((data) => (
                        <tr
                          key={`batches-item-${data.id}`}
                          className="border-b"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            <div>
                              <TrashIcon className="w-6 text-red-500" />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                            {data.id}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {capitalize(data.rawMaterial.name)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            ${data.unitCost}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            {data.stock} {data.measurement}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                            <div className="mx-auto w-full md:w-4/5 xl:w-9/12 2xl:w-3/5">
                              <input
                                type="number"
                                step="0.5"
                                min="0"
                                className="form-control block w-full px-1 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Cantidad (*)"
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

          <Button loading={loading} />
        </form>
      </section>

      <section className="mt-5 mx-6 md:mx-12 xl:mx-20 2xl:mx-28 flex items-center justify-end">
        <div className="text-right">
          <h3 className="text-lg font-mono">
            Costo Unitario: <span className="font-bold">${unitCost}</span>
          </h3>
          <h3 className="text-lg font-mono">
            Total del envasado: <span className="font-bold">$0.00</span>
          </h3>
        </div>
      </section>
    </>
  );
};

export default Packing;
