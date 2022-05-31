import Head from "next/head";
import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { getBatchesInProcess } from "@service/api/packing";
import Pagination from "@components/Pagination";
import { logError } from "@utils/errorHandler";
import PackingTable from "@components/Packing/Table/PackingTable";
import NewButton from "@components/Button/NewButton";

const BATCH_LIMIT = 15;

export default function Index() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadBatches = async () => {
      setLoading(true);
      getBatchesInProcess(BATCH_LIMIT, page)
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
  }, [page]);
  const totalPages = Math.ceil(batches?.count / BATCH_LIMIT);
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
          <div className="ml-2 font-sans font-normal text-3xl">Envasado</div>
        </div>
        <div>
          <NewButton label={"Registrar Nuevo Envasado"} path={"/packing/add"} />
        </div>
      </section>

      <Pagination
        loading={loading}
        page={page}
        limit={BATCH_LIMIT}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

      <section className="mt-1 mx-3 xl:mx-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <PackingTable
                  batches={batches?.rows}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {batches?.rows?.length > 14 ? (
        <Pagination
          loading={loading}
          page={page}
          limit={APIARY_LIMIT}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
