import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";

import AddEmployee from "@components/Employee/Form/AddEmployee";
import Head from "next/head";

const Add = () => {
  return (
    <>
      <Head>
        <title>Registrar Empleado - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/employee">
            <a>
              <ViewGridIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <Link href="/employee/add">
            <a className="ml-2 font-sans font-normal text-2xl">
              Agregar Empleado
            </a>
          </Link>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-5 text-lg">Información del Empleado</h2>
        <AddEmployee />
      </section>
    </>
  );
};

export default Add;
