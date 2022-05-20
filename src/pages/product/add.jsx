import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import AddProduct from "@components/Product/Form/AddProduct";

export default function Add() {
  return (
    <>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/product">
            <a>
              <ViewGridIcon className="w-12 text-beereign_silver" />
            </a>
          </Link>
          <p className="ml-2 font-sans font-normal text-2xl">
            Registro de Producto
          </p>
        </div>
      </section>

      <section className="mx-3 xl:mx-6 text-center">
        <h2 className="mt-5 text-lg">Información del Prodcuto</h2>
        <AddProduct />
      </section>
    </>
  );
}