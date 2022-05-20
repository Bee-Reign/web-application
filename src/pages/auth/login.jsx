import LoginForm from "@components/Auth/LoginForm";
import { useRouter } from "next/router";
import Image from "next/image";
import useAuth from "@hooks/useAuth";

export default function Login() {
  const { auth } = useAuth();
  const router = useRouter();
  if (auth !== null){
    router.push("/home");
  }
  return (
    <div className="text-sm text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg bg-white rounded-3xl px-5 py-12">
        <Image src="/logo.png" width="500" height="200" alt="BeeReign logo" />
        <div className="mt-7">
          <h1 className="font-semibold text-4xl">Login</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
