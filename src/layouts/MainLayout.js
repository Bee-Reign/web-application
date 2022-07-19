import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Header = dynamic(() => import("@components/Header"));
const TabBar = dynamic(() => import("@components/TabBar"));
import useAuth from "@hooks/useAuth";
const LoginForm = dynamic(() => import("@components/Auth/LoginForm"));
import Loading from "@components/Animation/Loading";
const Aside = dynamic(() => import("@components/Aside"));
const PasswordReset = dynamic(() => import("@components/Auth/PasswordReset"));

export default function MainLayout(props) {
  const { auth } = useAuth();
  const { children } = props;
  const router = useRouter();

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
      <div className="w-full min-h-screen flex flex-col">
        <Header employee={auth.employee} />
        <main className="bg-beereign_clear min-h-tab_height max-h-tab_height xl:min-h-xl_height overflow-y-scroll xl:overflow-hidden">
          <div className="xl:flex overflow-hidden">
            <Aside />
            <div className="w-full pt-4 xl:max-w-xl_width h-full xl:max-h-xl_height xl:overflow-y-auto">
              {children}
            </div>
          </div>
        </main>
        <TabBar />
      </div>
    </>
  );
}
