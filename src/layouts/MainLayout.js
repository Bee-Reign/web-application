import Header from "@components/Header/Header";
import TabBar from "@components/TabBar/TabBar";
import Head from "next/head";

export default function MainLayout(props) {
  const { children, page = '' } = props;
  return (
    <div className="bg-beereign_clear h-full">
      <Head>
        <title>{page} - BeeReign</title>
      </Head>
      <Header />
      <main className="min-h-content">
        {children}
      </main>
      <TabBar />
    </div>
  );
}
