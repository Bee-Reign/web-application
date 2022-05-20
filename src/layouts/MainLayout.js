import { useState } from "react";

import Header from "@components/Header/Header";
import TabBar from "@components/TabBar/TabBar";
import Head from "next/head";
import useAuth from "@hooks/useAuth";

export default function MainLayout(props) {
  const { auth } = useAuth();
  const { children } = props;

  if (auth === undefined) {
    return null;
  }

  if (auth === null) {
    return (
      <>
        <main className="bg-beereign_bg h-screen flex items-center justify-center">
          {children}
        </main>
      </>
    );
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
