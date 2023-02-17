import dynamic from "next/dynamic";
import Head from "next/head";

import useAuth from "@hooks/useAuth";
const HomeModules = dynamic(() => import("application/components/homeModules"));

export default function Home() {
  const {
    auth: { employee },
  } = useAuth();
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {/* ---------- Modules ---------- */}
      <section className=" mt-4 mx-4">
        <div className="grid grid-cols-1 gap-6 mb-2 w-full md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <HomeModules modules={employee?.modules} />
        </div>
      </section>
    </>
  );
}
