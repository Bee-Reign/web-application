import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getWarehouse } from "@service/api/warehouse";
import EditWarehouse from "@components/Warehouse/Form/EditWarehouse";

export default function Edit() {
  const [warehouse, setWarehouse] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getResult() {
      const result = await getWarehouse(id);
      setWarehouse(result);
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/warehouse">
            <a>
              <ViewGridIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <p className="ml-2 font-sans font-normal text-2xl">Editar Bodega</p>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-5 text-lg">Información de la Bodega</h2>
        <EditWarehouse warehouse={warehouse} />
      </section>
    </>
  );
}
