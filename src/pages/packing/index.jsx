import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import CheckPermission from "@utils/checkPermission";
import { HomeIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
const AddPacking = dynamic(() => import("application/packing/components/add"));

export default function Index() {
  CheckPermission("/packing");

  return (
    <>
      <Head>
        <title>Envasado</title>
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
                  </div>
                </li>
                <div className="ml-1 font-medium text-gray-400 md:ml-2 cursor-default">
                  Envasado
                </div>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Registrar nuevo envasado
            </h1>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <div>
              <Link
                href="/packing/history"
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 sm:ml-auto shadow-md shadow-gray-300 hover:scale-105 cursor-default transition-transfor"
              >
                <ClipboardDocumentListIcon className="w-6 mr-2 -ml-1" />
                Historial de envasado
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white shadow-lg shadow-gray-200 rounded-2xl mx-4 p-4 mb-6">
        <h3 className="mb-4 text-xl font-bold">Información del envasado</h3>
        <AddPacking />
      </section>
    </>
  );
}
