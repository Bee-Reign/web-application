import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Header = dynamic(() => import("application/common/header"));
const TabBar = dynamic(() => import("application/common/footer/tabBar"));
import useAuth from "@hooks/useAuth";
const LoginForm = dynamic(() =>
  import("application/components/auth/loginForm")
);
import Loading from "application/common/animation/loading";
import Sidebar from "@app/common/sidebar";
const PasswordReset = dynamic(() =>
  import("application/components/auth/passwordReset")
);

export default function WithAuthLayout(props) {
  const { auth } = useAuth();
  const [sidebar, setSidebar] = useState(false);
  const { children } = props;
  const router = useRouter();

  let sidebarRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!sidebarRef.current.contains(e.target)) {
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  if (auth === undefined) {
    return <Loading />;
  }

  if (auth === null) {
    const { token } = router.query;
    if (token) {
      return <PasswordReset token={token} />;
    }
    return <LoginForm />;
  }
  return (
    <>
      <div className="font-roboto w-full min-h-screen flex flex-col">
        <Header
          employee={auth.employee}
          onSidebarChange={() => setSidebar(!sidebar)}
          sidebarRef={sidebarRef}
        />
        <main className="bg-beereign_clear min-h-app_height max-h-app_height overflow-y-scroll xl:overflow-hidden">
          <div className="xl:flex overflow-hidden">
            <Sidebar sidebar={sidebar} />
            <div className="w-full pt-4 h-full max-h-app_height overflow-y-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
