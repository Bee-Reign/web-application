import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";

import AddEmployee from "@components/Employee/Form/AddEmployee";
import Head from "next/head";
import CheckPermission from "@utils/checkPermission";

const Add = () => {
  CheckPermission("/employee");
  return (
    <>
      <Head>
        <title>Registrar Empleado - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/employee">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Agregar Empleado
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Información del Empleado</h2>
        <AddEmployee />
      </section>
    </>
  );
};

export default Add;
