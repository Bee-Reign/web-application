import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";

import { getTypesOfEmployee } from "@service/api/typeOfEmployee";
import Pagination from "@components/Pagination";
import { logError } from "@utils/logError";

const TYPE_LIMIT = 15;

import TypeOfEmployeeTable from "@components/TypeOfEmployee/Table";
import NewButton from "@components/Button/NewButton";

export default function Index() {
  const [typesOfEmployee, setTypes] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadApiaries = async () => {
      setLoading(true);
      getTypesOfEmployee(TYPE_LIMIT, page, filter)
        .then((result) => {
          setTypes(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadApiaries();
  }, [page, filter, refresh]);

  const searchItems = (value) => {
    setFilter(value);
  };

  const totalPages = Math.ceil(typesOfEmployee?.count / TYPE_LIMIT);
  return (
    <>
      <Head>
        <title>Tipos de Empleado</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Tipos de Empleado
          </div>
        </div>
        <div>
          <NewButton
            label={"Registrar Tipo de Empleado"}
            path={"/type-of-employee/add"}
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
                placeholder="Buscar Tipo de Empleado..."
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
        limit={TYPE_LIMIT}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

      <section className="mt-6 mx-3 xl:mx-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <TypeOfEmployeeTable
                  typesOfEmployee={typesOfEmployee?.rows}
                  loading={loading}
                  onDelete={(deleted) => setRefresh(deleted)}
                  refresh={refresh}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {typesOfEmployee?.rows?.length > 14 ? (
        <Pagination
          loading={loading}
          page={page}
          limit={TYPE_LIMIT}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
