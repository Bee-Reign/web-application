import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getWarehouse } from "@service/api/warehouse";
import EditWarehouse from "@components/Warehouse/Form/EditWarehouse";
import Head from "next/head";
import { logError } from "@utils/logError";

export default function Edit() {
  const [warehouse, setWarehouse] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getResult() {
      getWarehouse(id)
        .then((result) => {
          setWarehouse(result);
        })
        .catch((err) => {
          logError(err);
          router.push("/warehouse");
        });
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
      <Head>
        <title>Editar Bodega</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/warehouse">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Editar Bodega
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Información de la Bodega</h2>
        <EditWarehouse warehouse={warehouse} />
      </section>
    </>
  );
}
