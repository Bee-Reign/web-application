import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getTypeOfEmployee } from "@service/api/typeOfEmployee";
import EditType from "@components/TypeOfEmployee/Form/EditType";
import { logError } from "@utils/logError";
import Head from "next/head";

export default function Edit() {
  const [typeOfEmployee, setType] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    async function getResult() {
      getTypeOfEmployee(id)
        .then((result) => {
          setType(result);
        })
        .catch((error) => {
          logError(error);
          router.push("/type-of-employee");
        });
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
      <Head>
        <title>Editar Tipo de Empleado</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/type-of-employee">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey hover:text-beereign_yellow" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">Editar TdP</div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">
          Información del Tipo de Empleado
        </h2>
        <EditType typeOfEmployee={typeOfEmployee} />
      </section>
    </>
  );
}
