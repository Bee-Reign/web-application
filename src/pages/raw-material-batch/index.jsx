import Head from "next/head";
import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Select from "react-select";

import { getRawMaterialBatches } from "@service/api/rawMaterialBatch";
import Pagination from "@components/Pagination";
import { logError } from "@utils/errorHandler";
import BatchTable from "@components/RawMaterialBatch/Table/BatchTable";

const RAW_MATERIAL_BATCH_LIMIT = 15;

export default function Index() {
  const [rawMaterialBatches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [type, setType] = useState("inStock");

  const orderOptions = [
    { value: "ASC", label: "PEPS" },
    { value: "DESC", label: "UEPS" },
  ];

  const typeOptions = [
    { value: "inStock", label: "En Stock" },
    { value: "empty", label: "Sin Stock" },
    { value: "all", label: "Todas" },
  ];

  const handleChangeOrder = (value) => {
    setOrder(value.value);
  };

  const handleChangeType = (value) => {
    setType(value.value);
  };

  useEffect(() => {
    const loadBatches = async () => {
      setLoading(true);
      getRawMaterialBatches(RAW_MATERIAL_BATCH_LIMIT, page, order, type)
        .then((result) => {
          setBatches(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadBatches();
  }, [page, order, type]);
  const totalPages = Math.ceil(
    rawMaterialBatches?.count / RAW_MATERIAL_BATCH_LIMIT
  );
  return (
    <>
      <Head>
        <title>Lotes de Materia Prima - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <p className="ml-2 font-sans font-normal text-xl">
            Lotes de Materia Prima
          </p>
        </div>
        <div className="">
          <Link href="/raw-material-batch/add">
            <a>
              <PlusIcon className="w-12 bg-beereign_green rounded-3xl text-white xl:hidden" />
              <button
                type="button"
                className="hidden xl:inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Registrar Nuevo Lote
              </button>
            </a>
          </Link>
        </div>
      </section>

      <Pagination
        page={page}
        limit={RAW_MATERIAL_BATCH_LIMIT}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

      <section className="mt-6 mx-3 xl:mx-6 flex justify-end">
        <div>
          <Select
            defaultValue={orderOptions[0]}
            onChange={handleChangeOrder}
            options={orderOptions}
            isSearchable={false}
          />
        </div>
        <div className="ml-1">
          <Select
            defaultValue={typeOptions[0]}
            onChange={handleChangeType}
            options={typeOptions}
            isSearchable={false}
          />
        </div>
      </section>
      <section className="mt-1 mx-3 xl:mx-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <BatchTable
                  rawMaterialBatches={rawMaterialBatches?.rows}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
