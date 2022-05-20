import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import useAuth from "@hooks/useAuth";
import { loginEmployeeSchema } from "@schema/employeeSchema";
import { employeeLogin } from "@service/api/employee";
import { logError } from "@utils/errorHandler";

export default function LoginForm() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const notify = (message, type) =>
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const { login } = useAuth();
  const router = useRouter();

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
      notify("Correo electrónico y contraseña requeridos", "error");
      setLoading(false);
      return;
    }
    employeeLogin(data)
      .then((response) => {
        formRef.current.reset();
        notify("Welcome", "success");
        login(response.token);
        router.push("/home");
      })
      .catch((error) => {
        const {
          response: { status },
        } = error;
        if (status === 401) {
          notify("Correo electronico o contraseña incorrectos", "error");
          return;
        }
        logError(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="mt-14" ref={formRef} onSubmit={handleSubmit}>
      <div className="rounded-md">
        <div className="mb-14 shadow-sm">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={256}
            className="appearance-none relative block w-full px-3 py-4 border border-beereign_gray text-gray-900 rounded-md focus:outline-none sm:text-sm"
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
            className="appearance-none rounded-md relative block w-full px-3 py-4 border border-beereign_gray  text-gray-900 focus:outline-none sm:text-sm"
            placeholder="Contraseña"
          />
        </div>
        <div className="text-sm text-left mt-5">
          <a className="font-medium text-beereign_gray hover:text-beereign_yellow">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
      <LoginButton loading={loading} />
    </form>
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
      className="group relative w-11/12 mt-12 py-4 text-base font-medium rounded-md text-black bg-beereign_yellow hover:bg-yellow-400"
    >
      <span>Sign in</span>
    </button>
  );
}
