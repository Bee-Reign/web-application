import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  router.push("/home");
  return (
    <>
      <h1 className="text-center">The bee is born 🐝</h1>
    </>
  );
}
