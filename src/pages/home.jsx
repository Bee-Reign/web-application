import Head from "next/head";
import { HomeIcon } from "@heroicons/react/solid";

import HomeModules from "@components/Home";
import useAuth from "@hooks/useAuth";

export default function Home() {
  const {
    auth: { employee },
  } = useAuth();
  return (
    <>
      <Head>
        <title>Home - BeeReign</title>
      </Head>
      <section className="ml-3 flex items-center justify-start">
        <div>
          <HomeIcon className="w-9 text-beereign_grey" aria-hidden="true" />
        </div>
        <h2 className="ml-2 font-sans font-normal text-3xl">Home</h2>
      </section>
      {/* ---------- Modules ---------- */}
      <section className=" mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <HomeModules modules={employee?.modules} />
        </div>
      </section>
    </>
  );
}
