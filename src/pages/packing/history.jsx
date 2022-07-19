import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import CheckPermission from "@utils/checkPermission";
import { getPackings } from "@service/api/packing";
const PackingTable = dynamic(() =>
import("@components/Packing/Table/PackingTable")
);
const Pagination = dynamic(() => import("@components/Pagination"));

export default function History() {
  CheckPermission("/packing");
  const [packings, setPackings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("DESC");
  const [type, setType] = useState("suspended");
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadPackings = async () => {
      setLoading(true);
      getPackings(limit, page, order, type)
        .then((result) => {
          setPackings(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadPackings();
  }, [page, limit, order, type]);

  const totalPages = Math.ceil(packings?.count / limit);

  return (
    <>
      <Head>
        <title>Historial de envasado</title>
      </Head>
      <section className="block justify-between items-center p-4 mx-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
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
                    <div className="ml-1 md:ml-2">
                      <Link href="/packing">
                        <a className="inline-flex items-center text-gray-700 hover:text-beereign_yellow cursor-default">
                          Envasado
                        </a>
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
              Historial de envasado
            </h1>
          </div>
          <div className="block items-center sm:flex md:divide-x md:divide-gray-100">
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
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="mx-3 py-2 md:py-0 form-select box bg-white text-gray-500 focus:outline-none"
            >
              <option value="DESC">Ultimos primero</option>
              <option value="ASC">Antiguos primero</option>
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="mx-3 py-2 md:py-0 form-select box bg-white text-gray-500 focus:outline-none"
            >
              <option value="suspended">Suspendidos</option>
              <option value="finished">Terminados</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-b-2xl">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <PackingTable packings={packings?.rows} loading={loading} />
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
