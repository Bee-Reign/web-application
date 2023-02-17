import dynamic from "next/dynamic";
import Head from "next/head";
import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import CheckPermission from "@utils/checkPermission";
import { getProductOutputs } from "application/product/output/service";
import { logError } from "@utils/logError";
const ProductOutputTable = dynamic(() =>
  import("application/product/output/components/table")
);
const Pagination = dynamic(() => import("application/common/pagination/normal"));

export default function History() {
  CheckPermission("/product-output");
  const [productOutputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [paid, setPaid] = useState(true);
  const [type, setType] = useState("CONTADO");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadBatches = async () => {
      setLoading(true);
      getProductOutputs(limit, page, paid, type)
        .then((result) => {
          setOutputs(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadBatches();
  }, [page, limit, paid, type, refresh]);
  const totalPages = Math.ceil(productOutputs?.count / limit);
  return (
    <>
      <Head>
        <title>Historial de Salidas</title>
      </Head>
      <section className="block justify-between items-center p-4 mx-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link
                    href="/home"
                    className="inline-flex items-center text-gray-700 hover:text-beereign_yellow cursor-default"
                  >
                    <HomeIcon className="w-5 mr-5" />
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 text-gray-400" />
                    <div className="ml-1 md:ml-2">
                      <Link
                        href="/product-output"
                        className="inline-flex items-center text-gray-700 hover:text-beereign_yellow cursor-default"
                      >
                        Salida de productos
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 text-gray-400" />
                    <div className="ml-1 font-medium text-gray-400 md:ml-2 cursor-default">
                      Historial
                    </div>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Historial de salidas
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <div className="mb-4 sm:pr-3 sm:mb-0">
              <div className="relative mt-1 sm:w-64 xl:w-96"></div>
            </div>
            <div className="flex items-center w-full sm:justify-end">
              <div className="hidden pl-2 space-x-1 md:flex"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200">
        <div className="bg-white rounded-t-2xl flex justify-between">
          <div className="my-auto">
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="mx-3 text-lg font-mono form-select box bg-white text-gray-500 focus:outline-none"
            >
              <option>10</option>
              <option>25</option>
              <option>35</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row">
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                if (e.target.value === "CONTADO") setPaid(true);
              }}
              className="mx-3 py-2 md:py-0 form-select box bg-white text-gray-500 focus:outline-none"
            >
              <option>CONTADO</option>
              <option>CRÉDITO</option>
            </select>
            {type === "CRÉDITO" ? (
              <select
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
                className="mx-3 py-2 md:py-0 form-select box bg-white text-gray-500 focus:outline-none"
              >
                <option value={true}>Pagados</option>
                <option value={false}>Por Cobrar</option>
              </select>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="overflow-x-auto rounded-b-2xl">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <ProductOutputTable
                productOutputs={productOutputs?.rows}
                loading={loading}
                onChange={(cancel) => setRefresh(cancel)}
                refresh={refresh}
              />
            </div>
          </div>
        </div>
      </section>

      <Pagination
        loading={loading}
        page={page}
        limit={limit}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />
    </>
  );
}
