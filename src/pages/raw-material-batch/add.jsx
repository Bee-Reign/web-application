import Link from "next/link";
import Head from "next/head";
import { ViewGridIcon } from "@heroicons/react/outline";
import AddBatch from "@components/RawMaterialBatch/Form/AddBatch";

const Add = () => {
  return (
    <>
      <Head>
        <title>Registrar Lote de MP - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/raw-material-batch">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Registrar Lote de MP
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Información del Lote</h2>
        <AddBatch />
      </section>
    </>
  );
};

export default Add;
