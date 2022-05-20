import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Link from "next/link";

import { getEmployees } from "@service/api/employee";
import Pagination from "@components/Pagination";

const EMPLOYEE_LIMIT = 15;

import EmployeeTable from "@components/Employee/Table";

const Index = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      getEmployees(EMPLOYEE_LIMIT, page)
        .then((result) => {
          setEmployees(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadEmployees();
  }, [page]);
  const totalPages = Math.ceil(employees?.count / EMPLOYEE_LIMIT);

  return (
    <>
      <Head>
        <title>Empleados - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <Link className href="/employee">
            <a className="ml-2 font-sans font-normal text-2xl">Empleados</a>
          </Link>
        </div>
        <div className="">
          <Link href="/employee/add">
            <a>
              <PlusIcon className="w-12 bg-beereign_green rounded-3xl text-white xl:hidden" />
              <button
                type="button"
                className="hidden xl:inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
              >
                Nuevo Empleado
              </button>
            </a>
          </Link>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 mt-5">
        <div className="flex justify-center xl:justify-start">
          <div className="w-full xl:w-3/4 2xl:w-1/2">
            <div className="input-group relative flex items-stretch w-full mb-4 rounded">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Buscar Empleado"
              />
              <span
                className="input-group-text flex items-center px-3 py-1.5 text-base font-normal text-gray-700 text-center whitespace-nowrap rounded"
                id="basic-addon2"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      <Pagination
        page={page}
        limit={EMPLOYEE_LIMIT}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

      <section className="mt-6 mx-3 xl:mx-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <EmployeeTable employees={employees?.rows} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
