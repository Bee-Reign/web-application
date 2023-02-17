import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";

import useAuth from "@hooks/useAuth";
import capitalize from "@utils/capitalize";
const ChangePassword = dynamic(() =>
  import("application/components/changePassword")
);

export default function Index(props) {
  const { auth, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  if (!auth?.employee) return null;
  return (
    <>
      <Head>
        <title>Mi Cuenta</title>
      </Head>
      <ChangePassword
        showModal={showModal}
        id={auth.employee.id}
        onShowModalChange={(showModal) => setShowModal(showModal)}
      />
      <section className="mt-4">
        <UserIcon className="mx-auto w-48 border-2 shadow-md rounded-xl text-beereign_yellow" />
        <div className="mt-4 text-center">
          <h2 className="font-serif text-2xl">
            {capitalize(auth.employee.name)}{" "}
            {capitalize(auth.employee.lastName)}
          </h2>
          <h3 className="text-xl font-sans">
            {capitalize(auth.employee.typeOfEmployee.name)}
          </h3>
        </div>
      </section>
      <section className="mt-4 mx-auto w-3/4 md:w-2/3 xl:w-1/3 text-center">
        <div
          onClick={() => setShowModal(true)}
          className="mt-4 px-16 py-4 border-2 text-beereign_yellow font-serif text-lg leading-tight rounded-md shadow-md hover:bg-gray-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out"
        >
          Cambiar Contraseña
        </div>
        <div
          onClick={logout}
          className="mt-4 px-16 py-4 border-2 bg-beereign_ligth text-beereign_clear font-serif text-lg leading-tight rounded-md shadow-md hover:bg-gray-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-center"
        >
          <LockClosedIcon className="w-8 text-beereign_clear" />{" "}
          <p>Cerrar Sessión</p>
        </div>
      </section>
    </>
  );
}
