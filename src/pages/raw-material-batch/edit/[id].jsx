import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getBatch } from "@service/api/rawMaterialBatch";
import EditBatch from "@components/RawMaterialBatch/Form/EditBatch";
import { logError } from "@utils/logError";
import Head from "next/head";

export default function Edit() {
  const [batch, setBatch] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getResult() {
      getBatch(id)
        .then((result) => {
          setBatch(result);
        })
        .catch((err) => {
          logError(err);
          router.push("/raw-material-batch");
        });
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
    <Head>
      <title>Editar Lote de MP - BeeReign</title>
    </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/raw-material-batch">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Editar Lote de MP
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Información del Lote</h2>
        <EditBatch batch={batch} />
      </section>
    </>
  );
}
