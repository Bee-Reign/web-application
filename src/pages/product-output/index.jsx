import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  ClipboardListIcon,
  ChevronRightIcon,
  HomeIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";

import CheckPermission from "@utils/checkPermission";
import capitalize from "@utils/capitalize";
import { checkId } from "@schema/productBatchSchema";
import { getProductForOutput } from "@service/api/productBatch";
import { createSchema } from "@schema/productOutputSchema";
import { addProductOutput } from "@service/api/productOutput";
import { logError } from "@utils/logError";
const SearchProductBatch = dynamic(() =>
  import("@components/ProductBatch/Modal/SearchProductBatch")
);
const Button = dynamic(() => import("@components/Button"));

const Output = () => {
  CheckPermission("/product-output");
  const formRef = useRef(null);
  const [batch, setBatch] = useState("");
  const [type, setType] = useState("CONTADO");
  const [total, setTotal] = useState(0);
  const [batches, setBatches] = useState([]);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    updateTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batches]);

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
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    addProductOutput(data)
      .then((response) => {
        toast.success("Salida de producto Registrada");
        setBatches([]);
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
      <section className="block justify-between items-center p-4 mx-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex mb-5">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link href="/home">
                    <a className="inline-flex items-center text-gray-700 hover:text-beereign_yellow cursor-default">
                      <HomeIcon className="w-5 mr-5" />
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 text-gray-400" />
                  </div>
                </li>
                <div className="ml-1 font-medium text-gray-400 md:ml-2 cursor-default">
                  Salida de productos
                </div>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Registrar nueva salida
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <div className="mb-4 sm:pr-3 sm:mb-0">
              <div className="relative mt-1 sm:w-64 xl:w-96">
                <div className="flex">
                  <input
                    type="search"
                    value={batch}
                    autoFocus
                    className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-yellow-50 focus:border-beereign_yellow block w-full p-2.5 focus:outline-none"
                    placeholder="Esperando escanner..."
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setBatch(e.target.value)}
                  />
                  <SearchIcon
                    className="pl-2 w-12 hover:text-beereign_yellow hover:scale-110"
                    onClick={() => setSearch(true)}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center w-full sm:justify-end">
              <Link href="/product-output/history">
                <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 sm:ml-auto shadow-md shadow-gray-300 hover:scale-105 cursor-default transition-transfor">
                  <ClipboardListIcon className="w-6 mr-2 -ml-1" />
                  Historial de salida
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200">
        <div className="bg-white rounded-t-2xl">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mx-3 font-mono text-xl form-select box bg-white text-gray-500 focus:outline-none"
          >
            <option>CONTADO</option>
            <option>CRÉDITO</option>
          </select>
        </div>
        <div className="overflow-x-auto rounded-b-2xl">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <form className="bg-white" ref={formRef} onSubmit={handleSubmit}>
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
                        Lote
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                      >
                        Nombre del Producto
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                      >
                        Cantidad Disponible
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                      >
                        Costo del producto
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                      >
                        Cantidad a salir
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                      >
                        Precio
                      </th>
                      <th
                        scope="col"
                        className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {batches.map((data, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
                          <div
                            type="button"
                            onClick={(e) => handleDelete(index, e)}
                          >
                            <TrashIcon className="w-6 text-red-500" />
                          </div>
                        </td>
                        <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                          #{data.id}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                          {capitalize(data.packing.product.name)}
                        </td>
                        <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                          {data.stock}
                        </td>
                        <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                          ${data.unitCost}
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                          <input
                            type="number"
                            step="1"
                            min="1"
                            defaultValue={1}
                            max={data.stock}
                            className="appearance-none block w-48 text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                            placeholder="Cantidad"
                            onChange={(e) =>
                              changeQuantity(e.target.value, index)
                            }
                          />
                        </td>
                        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                          <input
                            type="number"
                            step="0.01"
                            min={data.unitCost}
                            defaultValue={data.unitCost}
                            className="form-control block w-full px-1 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Precio de venta"
                            onChange={(e) => changePrice(e.target.value, index)}
                          />
                        </td>
                        <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                          ${data.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-end mr-5">
                  <div className="text-base font-semibold text-gray-900 uppercase">
                    Total
                  </div>
                  <div className="text-base font-bold text-gray-900">
                    ${total}
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <Button reset={false} loading={loading} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Output;
