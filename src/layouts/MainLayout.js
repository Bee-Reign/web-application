import Header from "@components/Header/Header";
import TabBar from "@components/TabBar/TabBar";
import useAuth from "@hooks/useAuth";
import LoginForm from "@components/Auth/LoginForm";
import Loading from "@components/Animation/Loading";

export default function MainLayout(props) {
  const { auth } = useAuth();
  const { children } = props;

  if (auth === undefined) {
    return <Loading />;
  }

  if (auth === null) {
    return <LoginForm />;
  }
  return (
    <>
      <Header employee={auth.employee} />
      <main className="mt-16 bg-beereign_clear min-h-tab_height xl:min-h-xl_height">
        <div className="pt-4">{children}</div>
      </main>
      <footer className="mt-20 xl:mt-0">
        <TabBar />
      </footer>
    </>
  );
}
