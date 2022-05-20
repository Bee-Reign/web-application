import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getEmployee } from "@service/api/employee";
import EditProfile from "@components/Employee/Form/EditProfile";
import Head from "next/head";

export default function Edit() {
  const [employee, setEmployee] = useState(undefined);
  const [profile, setProfile] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    if (!router.isReady) return;
    async function getResult() {
      const result = await getEmployee(id);
      setEmployee(result);
    }
    getResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.isReady]);

  return (
    <>
      <Head>
        <title>Editar Empleado - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/employee">
            <a>
              <ViewGridIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <Link className href="/employee/add">
            <a className="ml-2 font-sans font-normal text-2xl">
              Editar Empleado
            </a>
          </Link>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-5 text-lg">Información del Empleado</h2>
        <div className="mt-5 flex space-x-2 justify-center">
          <div>
            <TabButtons
              profile={profile}
              onTabChange={(profile) => setProfile(profile)}
            />
          </div>
        </div>
        <EditProfile profile={profile} employee={employee} />
      </section>
    </>
  );
}

function TabButtons({ profile, onTabChange }) {
  const showProfileTab = () => {
    onTabChange(true);
  };

  const showAccesTab = () => {
    onTabChange(false);
  };

  if (profile === true) {
    return (
      <>
        <button
          onClick={showProfileTab}
          type="button"
          disabled={true}
          className="inline-block  px-6 py-2 border-2 border-beereign_yellow text-beereign_yellow font-medium text-xs leading-tight uppercase rounded-full hover:bg-beereign_silver hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          Perfil
        </button>

        <button
          onClick={showAccesTab}
          type="button"
          className="ml-1 inline-block px-6 py-2 border-2 border-beereign_silver text-beereign_silver font-medium text-xs leading-tight uppercase rounded-full hover:bg-beereign_silver hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          Acceso
        </button>
      </>
    );
  }
  if (profile === false) {
    return (
      <>
        <button
          onClick={showProfileTab}
          type="button"
          className="inline-block  px-6 py-2 border-2 border-beereign_silver text-beereign_silver font-medium text-xs leading-tight uppercase rounded-full hover:bg-beereign_silver hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          Perfil
        </button>

        <button
          onClick={showAccesTab}
          type="button"
          disabled={true}
          className="ml-1 inline-block px-6 py-2 border-2 border-beereign_yellow text-beereign_yellow font-medium text-xs leading-tight uppercase rounded-full hover:bg-beereign_silver hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          Acceso
        </button>
      </>
    );
  }
}
