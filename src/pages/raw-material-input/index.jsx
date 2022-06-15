import Link from "next/link";
import Head from "next/head";
import { HomeIcon } from "@heroicons/react/outline";
import AddBatch from "@components/RawMaterialBatch/Form/AddBatch";

export default function Index() {
  return (
    <>
      <Head>
        <title>Entrada de Materia Prima</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Entrada de MP
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Información del Lote</h2>
        <AddBatch />
      </section>
    </>
  );
}
