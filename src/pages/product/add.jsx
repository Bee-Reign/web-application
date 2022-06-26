import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import AddProduct from "@components/Product/Form/AddProduct";
import CheckPermission from "@utils/checkPermission";
import Head from "next/head";

export default function Add() {
  CheckPermission("/product");
  return (
    <>
      <Head>
        <title>Registrar Producto</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/product">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey hover:text-beereign_yellow" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Registro de Producto
          </div>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-6 font-mono text-2xl">Información del Prodcuto</h2>
        <AddProduct />
      </section>
    </>
  );
}
