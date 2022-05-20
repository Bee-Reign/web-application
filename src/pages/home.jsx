import Head from "next/head";
import Home from "@components/Home/Home";

export default function dashboard() {
  return (
    <>
      <Head>
        <title>Home - BeeReign</title>
      </Head>
      <Home />
    </>
  );
}
