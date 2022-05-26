import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

import useAuth from "@hooks/useAuth";
import { loginEmployeeSchema } from "@schema/employeeSchema";
import { employeeLogin } from "@service/api/employee";
import { logError } from "@utils/errorHandler";
import Head from "next/head";

export default function LoginForm() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      email: formData.get("email").toLocaleLowerCase(),
      password: formData.get("password"),
    };

    const { error } = await loginEmployeeSchema.validate(data);
    if (error) {
      toast.error("Correo electrónico y contraseña requeridos");
      setLoading(false);
      return;
    }
    employeeLogin(data)
      .then((response) => {
        formRef.current.reset();
        login(response.token);
        toast.success("Welcome");
        router.push("/home");
      })
      .catch((error) => {
        const {
          response: { status },
        } = error;
        if (status === 401) {
          toast.error("Correo electronico o contraseña incorrectos");
          return;
        }
        logError(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Head>
        <title>Login - BeeReign</title>
      </Head>
      <main className="bg-beereign_bg h-screen flex items-center justify-center">
        <div className="text-sm text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg bg-white rounded-3xl px-5 py-12">
            <Image
              src="/logo.png"
              width="500"
              height="200"
              alt="BeeReign logo"
            />
            <div className="mt-7">
              <h1 className="text-4xl">Login</h1>
            </div>
            <form className="mt-14" ref={formRef} onSubmit={handleSubmit}>
              <div className="rounded-md">
                <div className="mb-14 shadow-sm">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={256}
                    className="font-thin appearance-none relative block w-full px-3 py-4 border border-beereign_gray text-gray-900 focus:border-beereign_yellow rounded-md focus:outline-none sm:text-sm"
                    placeholder="Correo Electrónico"
                  />
                </div>
                <div className="shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    maxLength={60}
                    className="font-thin appearance-none rounded-md relative block w-full px-3 py-4 border border-beereign_gray  text-gray-900 focus:border-beereign_yellow focus:outline-none sm:text-sm"
                    placeholder="Contraseña"
                  />
                </div>
                <div className="text-sm text-left mt-5">
                  <a className="font-medium font-mono text-beereign_gray hover:text-beereign_yellow">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <LoginButton loading={loading} />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

function LoginButton({ loading }) {
  if (loading == true) {
    return (
      <button
        type="submit"
        className="relative w-11/12 mt-12 py-4 text-base font-medium rounded-md text-black bg-beereign_yellow hover:bg-yellow-400"
      >
        <div
          style={{ borderTopColor: "transparent" }}
          className="mx-auto w-7 h-7 border-4 border-beereign_clear border-solid rounded-full animate-spin"
        />
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="group relative w-11/12 mt-12 py-4 text-xl rounded-md text-black bg-beereign_yellow hover:bg-yellow-400"
    >
      <span>Sign in</span>
    </button>
  );
}
