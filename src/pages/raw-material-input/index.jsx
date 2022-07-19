import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import { HomeIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/outline";
import CheckPermission from "@utils/checkPermission";
const AddBatch = dynamic(() =>
  import("@components/RawMaterialBatch/Form/AddBatch")
);

export default function Index() {
  CheckPermission("/raw-material-input");
  return (
    <>
      <Head>
        <title>Entrada de Materia Prima</title>
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
                  </div>
                </li>
                <div className="ml-1 font-medium text-gray-400 md:ml-2 cursor-default">
                  Entrada de materia prima
                </div>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Registrar entrada de materia prima
            </h1>
          </div>
          <div className="block items-center sm:flex md:divide-x md:divide-gray-100"></div>
        </div>
      </section>

      <section className="bg-white shadow-lg shadow-gray-200 rounded-2xl mx-4 p-4 mb-6">
        <h3 className="mb-4 text-xl font-bold">Información del lote</h3>
        <AddBatch />
      </section>
    </>
  );
}
