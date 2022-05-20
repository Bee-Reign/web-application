import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import AddWarehouse from "@components/Warehouse/Form/AddWarehouse";

export default function Add() {
  return (
    <>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/warehouse">
            <a>
              <ViewGridIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <Link className href="/warehouse/add">
            <a className="ml-2 font-sans font-normal text-2xl">
              Registro de Bodega
            </a>
          </Link>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-5 text-lg">Información de la Bodega</h2>
        <AddWarehouse />
      </section>
    </>
  );
}
