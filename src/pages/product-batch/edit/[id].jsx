import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getProductBatch } from "@service/api/productBatch";
import EditBatch from "@components/ProductBatch/Form/EditBatch";
import { logError } from "@utils/logError";
import Head from "next/head";
import CheckPermission from "@utils/checkPermission";

export default function Edit() {
  CheckPermission("/product-batch");
  const [batch, setBatch] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getResult() {
      getProductBatch(id)
        .then((result) => {
          setBatch(result);
        })
        .catch((err) => {
          logError(err);
          router.push("/product-batch");
        });
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
      <Head>
        <title>Editar Lote de Producto</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/product-batch">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey hover:text-beereign_yellow" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Editar Lote de Producto
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
