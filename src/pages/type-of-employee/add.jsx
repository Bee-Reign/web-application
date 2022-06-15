import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import AddType from "@components/TypeOfEmployee/Form/AddType";
import Head from "next/head";

export default function Add() {
  return (
    <>
      <Head>
        <title>Agregar Tipo de Empleado</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/type-of-employee">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Registrar TdE
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">
          Información del Tipo de Empleado
        </h2>
        <AddType />
      </section>
    </>
  );
}
