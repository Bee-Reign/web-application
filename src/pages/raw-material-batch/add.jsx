import Link from "next/link";
import Head from "next/head";
import { ViewGridIcon } from "@heroicons/react/outline";
import AddBatch from "@components/RawMaterialBatch/Form/AddBatch";

const Add = () => {
  return (
    <>
      <Head>
        <title>Nuevo Lote de MP - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/raw-material-batch">
            <a>
              <ViewGridIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <Link href="/raw-material-batch/add">
            <a className="ml-2 font-sans font-normal text-xl">
              Registrar Nuevo Lote
            </a>
          </Link>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-5 text-lg">Información del Lote</h2>
        <AddBatch />
      </section>
    </>
  );
};

export default Add;
