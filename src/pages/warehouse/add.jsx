import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import AddWarehouse from "@components/Warehouse/Form/AddWarehouse";
import Head from "next/head";

export default function Add() {
  return (
    <>
      <Head>
        <title>Registro de Bodega</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/warehouse">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey hover:text-beereign_yellow" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Registro de Bodega
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Información de la Bodega</h2>
        <AddWarehouse />
      </section>
    </>
  );
}
