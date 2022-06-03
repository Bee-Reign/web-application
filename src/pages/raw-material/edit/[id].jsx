import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getRawMaterial } from "@service/api/rawMaterial";
import EditRawMaterial from "@components/RawMaterial/Form/EditRawMaterial";
import { logError } from "@utils/logError";

export default function Edit() {
  const [rawMaterial, setRawMaterial] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getResult() {
      getRawMaterial(id)
        .then((result) => {
          setRawMaterial(result);
        })
        .catch((err) => {
          logError(err);
          router.push("/raw-material");
        });
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/raw-material">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Editar Materia Prima
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">
          Información de Materia Prima
        </h2>
        <EditRawMaterial rawMaterial={rawMaterial} />
      </section>
    </>
  );
}
