import Head from "next/head";
import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Select from "react-select";

import { getRawMaterialBatches } from "@service/api/rawMaterialBatch";
import Pagination from "@components/Pagination";
import { logError } from "@utils/logError";
import BatchTable from "@components/RawMaterialBatch/Table/BatchTable";

const RAW_MATERIAL_BATCH_LIMIT = 15;

export default function Index() {
  const [rawMaterialBatches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("ASC");
  const [type, setType] = useState("inStock");
  const [refresh, setRefresh] = useState(false);

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
  }, [page, order, type, refresh]);
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
              <HomeIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">Lotes de MP</div>
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
