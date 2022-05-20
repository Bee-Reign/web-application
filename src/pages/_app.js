import { useState, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";

import AuthContext from "context/AuthContext";
import { employeeProfile } from "@service/api/employee";
import { logError } from "@utils/errorHandler";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@layouts/MainLayout";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const router = useRouter();

  const reload = async (access_token) => {
    axios.defaults.headers.Authorization = `Bearer ${access_token}`;
    employeeProfile()
      .then(({ data: employee }) => {
        setAuth({
          employee,
        });
      })
      .catch((error) => {
        setAuth(null);
        if (logError(error) === 404) {
          logout();
        }
      });
  };

  useEffect(() => {
    const access_token = Cookie.get("access_token");
    if (access_token) {
      reload(access_token);
    } else {
      setAuth(null);
      if (router.asPath !== "/auth/login") {
        router.push("/auth/login");
      }
    }
    setReloadUser(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadUser]);

  const login = async (token) => {
    if (token) {
      const access_token = token;
      Cookie.set("access_token", access_token, { expires: 30 });
      axios.defaults.headers.Authorization = `Bearer ${access_token}`;
      employeeProfile().then(({ data: employee }) => {
        setAuth({
          employee,
        });
      });
    }
  };

  const logout = () => {
    Cookie.remove("access_token");
    setAuth(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = "/auth/login";
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={authData}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>

      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default MyApp;
