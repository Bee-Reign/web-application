import Head from "next/head";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  router.push("/home");
  return (
    <>
      <Head>
        <title>BeeReign</title>
      </Head>
    </>
  );
}
