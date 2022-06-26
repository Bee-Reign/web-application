import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { getRawMaterials } from "@service/api/rawMaterial";
import Pagination from "@components/Pagination";
import { logError } from "@utils/logError";

const RAW_MATERIAL_LIMIT = 15;

import RawMaterialTable from "@components/RawMaterial/Table";
import Head from "next/head";
import NewButton from "@components/Button/NewButton";

export default function Index() {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadRawMaterials = async () => {
      setLoading(true);
      getRawMaterials(RAW_MATERIAL_LIMIT, page, filter)
        .then((result) => {
          setRawMaterials(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadRawMaterials();
  }, [page, filter, refresh]);

  const searchItems = (value) => {
    setFilter(value);
  };

  const totalPages = Math.ceil(rawMaterials?.count / RAW_MATERIAL_LIMIT);
  return (
    <>
      <Head>
        <title>Inventario de Materia Prima</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-9 text-beereign_grey hover:text-beereign_yellow" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Inventario de MP
          </div>
        </div>
        <div>
          <NewButton
            label={"Registrar Materia Prima"}
            path={"/raw-material/add"}
          />
        </div>
      </section>

      <section className="mx-3 xl:mx-6 mt-5">
        <div className="flex justify-center xl:justify-start">
          <div className="w-full xl:w-3/4 2xl:w-1/2">
            <div className="input-group relative flex items-stretch w-full mb-4 rounded">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-3 text-base font-light text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-white focus:border-beereign_yellow focus:outline-none"
                placeholder="Buscar Materia Prima..."
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
        limit={RAW_MATERIAL_LIMIT}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

      <section className="mt-6 mx-3 xl:mx-6">
        <p className="text-center font-serif text-lg">
          Items:{" "}
          <span className="font-bold font-mono">{rawMaterials?.count}</span>
        </p>
        {filter === "" ? (
          <p className="text-center font-serif text-lg">
            Total:{" "}
            <span className="font-bold font-mono">
              ${rawMaterials?.totalAmount ? rawMaterials?.totalAmount : "0.00"}
            </span>
          </p>
        ) : (
          <></>
        )}
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <RawMaterialTable
                  rawMaterials={rawMaterials?.rows}
                  loading={loading}
                  onDelete={(deleted) => setRefresh(deleted)}
                  refresh={refresh}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {rawMaterials?.rows?.length > 14 ? (
        <Pagination
          loading={loading}
          page={page}
          limit={RAW_MATERIAL_LIMIT}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
