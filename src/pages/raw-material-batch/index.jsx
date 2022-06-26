import Head from "next/head";
import { useState, useEffect } from "react";
import { HomeIcon, TrashIcon, SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Select from "react-select";

import { getRawMaterialBatches } from "@service/api/rawMaterialBatch";
import { getRawMaterialByCode } from "@service/api/rawMaterial";
import Pagination from "@components/Pagination";
import { logError } from "@utils/logError";
import SearchRawMaterial from "@components/Modal/SearchRawMaterial";
import BatchTable from "@components/RawMaterialBatch/Table/BatchTable";

const RAW_MATERIAL_BATCH_LIMIT = 15;

export default function Index() {
  const [rawMaterialBatches, setBatches] = useState([]);
  const [rawMaterial, setRawMaterial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [type, setType] = useState("inStock");
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState(false);
  const [RMQ, setRMQ] = useState("");

  const orderOptions = [
    { value: "ASC", label: "Antiguos Primero" },
    { value: "DESC", label: "Últimos Primero" },
  ];

  const typeOptions = [
    { value: "inStock", label: "En Stock" },
    { value: "empty", label: "Sin Stock" },
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
      getRawMaterialBatches(
        RAW_MATERIAL_BATCH_LIMIT,
        page,
        order,
        type,
        rawMaterial ? rawMaterial?.id : rawMaterial
      )
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
  }, [page, order, type, refresh, rawMaterial]);
  const totalPages = Math.ceil(
    rawMaterialBatches?.count / RAW_MATERIAL_BATCH_LIMIT
  );

  async function handleKeyPress(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
      getRawMaterialByCode(RMQ.toLowerCase())
        .then((result) => {
          setRawMaterial(result);
        })
        .catch((err) => {
          logError(err);
        })
        .finally(() => {
          setRMQ("");
        });
      return;
    }
  }

  return (
    <>
      <Head>
        <title>Lotes de Materia Prima</title>
      </Head>
      <SearchRawMaterial
        showModal={search}
        onClick={(value) => setRawMaterial(value)}
        onShowModalChange={(value) => setSearch(value)}
      />
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-9 text-beereign_grey hover:text-beereign_yellow" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">Lotes de MP</div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 mt-5">
        <div className="flex justify-center xl:justify-start">
          <div className="w-full xl:w-3/4 2xl:w-1/2">
            <div className="input-group relative flex items-stretch w-full mb-4 rounded">
              {rawMaterial ? (
                <TrashIcon
                  className="pl-2 w-12 text-red-500 hover:text-red-600"
                  onClick={() => setRawMaterial(null)}
                />
              ) : (
                <></>
              )}
              <input
                type="search"
                value={RMQ}
                onChange={(e) => setRMQ(e.target.value)}
                onKeyPress={handleKeyPress}
                className="form-control block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:border-beereign_yellow focus:outline-none"
                placeholder={
                  rawMaterial
                    ? rawMaterial.name
                    : "Escanear Código de Materia Prima..."
                }
              />
              <SearchIcon
                className="pl-2 w-12 text-beereign_grey hover:text-beereign_yellow"
                onClick={() => setSearch(true)}
              />
            </div>
          </div>
        </div>
      </section>

      <Pagination
        loading={loading}
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
                  onDelete={(deleted) => setRefresh(deleted)}
                  refresh={refresh}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {rawMaterialBatches?.rows?.length > 14 ? (
        <Pagination
          loading={loading}
          page={page}
          limit={RAW_MATERIAL_BATCH_LIMIT}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
