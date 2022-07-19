import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { HomeIcon } from "@heroicons/react/solid";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { ClipboardListIcon } from "@heroicons/react/solid";

import CheckPermission from "@utils/checkPermission";
import { getPacking } from "@service/api/packing";
import { logError } from "@utils/logError";
import Loading from "@components/Animation/Loading";
const ContinuePacking = dynamic(() => import("@components/Packing/Form/ContinuePacking"));

export default function Continue() {
  CheckPermission("/packing");
  const [packing, setPacking] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    setLoading(true);
    async function getResult() {
      getPacking(id)
        .then((result) => {
          setPacking(result);
        })
        .catch((err) => {
          logError(err);
          router.push("/packing/history");
        })
        .finally(() => {
          setLoading(false);
        });
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  const onSubmit = () => {
    router.push("/packing/history");
  };

  return (
    <>
      <Head>
        <title>Envasado</title>
      </Head>
      <section className="block justify-between items-center p-4 mx-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link href="/home">
                    <a className="inline-flex items-center text-gray-700 hover:text-beereign_yellow cursor-default">
                      <HomeIcon className="w-5 mr-5" />
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 text-gray-400" />
                  </div>
                </li>
                <div className="ml-1 font-medium text-gray-400 md:ml-2 cursor-default">
                  Envasado
                </div>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Continuar registro de envasado
            </h1>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <div>
              <Link href="/packing/history">
                <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 sm:ml-auto shadow-md shadow-gray-300 hover:scale-105 cursor-default transition-transfor">
                  <ClipboardListIcon className="w-6 mr-2 -ml-1" />
                  Historial de envasado
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <section className="bg-white shadow-lg shadow-gray-200 rounded-2xl mx-4 p-4 mb-6">
          <h3 className="mb-4 text-xl font-bold">Información del envasado</h3>
          {loading === true ? (
            <Loading />
          ) : (
            <ContinuePacking packing={packing} onSubmit={() => onSubmit()} />
          )}
        </section>
      </section>
    </>
  );
}
