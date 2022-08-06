import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";

import { passwordResetSchema } from "@schema/employeeSchema";
import { resetPassword } from "@service/api/employee";
import { logError } from "@utils/logError";
import LoginButton from "@components/Button/LoginButton";

export default function PasswordReset({ token }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      password: formData.get("password"),
      repeat_password: formData.get("repeat_password"),
    };
    const { error } = await passwordResetSchema.validate(data);
    if (error) {
      toast.error("Las contraseñas no coinciden o no son validas");
      setLoading(false);
      return;
    }
    resetPassword({ token: token, password: formData.get("password") })
      .then((response) => {
        formRef.current.reset();
        toast.success("Contraseña actualizada");
      })
      .catch((error) => {
        const {
          response: { status },
        } = error;
        if (status === 401) {
          toast.error("El token no es válido o ya expiró");
          return;
        }
        logError(error);
      })
      .finally(() => {
        setLoading(false);
        router.push("/");
      });
  };

  return (
    <>
      <Head>
        <title>Restablecer Contraseña - BeeReign</title>
      </Head>
      <main className="bg-beereign_bg h-screen flex items-center justify-center">
        <div className="text-sm text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md md:max-w-lg bg-white rounded-3xl px-5 py-16 md:py-24">
            <Image
              src="/logo.png"
              width="576"
              height="150"
              alt="BeeReign logo"
            />
            <div className="mt-14">
              <h1 className="text-2xl font-mono">Restablecer Contraseña</h1>
            </div>
            <form className="mt-14" ref={formRef} onSubmit={handleSubmit}>
              <div className="rounded-md">
                <div className="mb-14 shadow-sm">
                  <input
                    name="password"
                    type="password"
                    maxLength={60}
                    minLength={8}
                    className="font-thin appearance-none relative block w-full px-3 py-4 border border-beereign_gray text-gray-900 focus:border-beereign_yellow rounded-md focus:outline-none sm:text-sm"
                    placeholder="Nueva contraseña"
                  />
                </div>
                <div className="shadow-sm">
                  <input
                    name="repeat_password"
                    type="password"
                    maxLength={60}
                    minLength={8}
                    className="font-thin appearance-none rounded-md relative block w-full px-3 py-4 border border-beereign_gray  text-gray-900 focus:border-beereign_yellow focus:outline-none sm:text-sm"
                    placeholder="Vuelva a ingresar la contraseña"
                  />
                </div>
              </div>
              <LoginButton
                loading={loading}
                message={"Restablecer Contraseña"}
              />
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
