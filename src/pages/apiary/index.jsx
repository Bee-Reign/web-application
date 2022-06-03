import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";

import { getApiaries } from "@service/api/apiary";
import Pagination from "@components/Pagination";
import { logError } from "@utils/logError";

const APIARY_LIMIT = 15;

import ApiaryTable from "@components/Apiary/Table";
import NewButton from "@components/Button/NewButton";
import CheckPermission from "@utils/checkPermission";

export default function Index() {
  CheckPermission("/apiary");
  const [apiaries, setApiaries] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(null);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const loadApiaries = async () => {
      setLoading(true);
      getApiaries(APIARY_LIMIT, page, filter)
        .then((result) => {
          setApiaries(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadApiaries();
  }, [page, filter]);

  const searchItems = (value) => {
    setFilter(value);
  };

  const totalPages = Math.ceil(apiaries?.count / APIARY_LIMIT);

  return (
    <>
      <Head>
        <title>Apiarios - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">Apiarios</div>
        </div>
        <div>
          <NewButton label={"Registrar Apiario"} path={"/apiary/add"} />
        </div>
      </section>

      <section className="mx-3 xl:mx-6 mt-5">
        <div className="flex justify-center xl:justify-start">
          <div className="w-full xl:w-3/4 2xl:w-1/2">
            <div className="input-group relative flex items-stretch w-full mb-4 rounded">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-3 text-base font-light text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-white focus:border-beereign_yellow focus:outline-none"
                placeholder="Buscar Apiario..."
                maxLength={25}
                onChange={(e) =>
                  searchItems(e.target.value.toLocaleLowerCase())
                }
              />
            </div>
          </div>
        </div>
      </section>

      <Pagination
        loading={loading}
        page={page}
        limit={APIARY_LIMIT}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

      <section className="mt-6 mx-3 xl:mx-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <ApiaryTable apiaries={apiaries?.rows} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {apiaries?.rows?.length > 14 ? (
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
