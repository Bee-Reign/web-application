import Pagination from "@components/Pagination";
import { ViewGridIcon } from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function Apiary() {
  return (
    <>
      <section className="mx-3 mt-4 flex items-center justify-between">
        <Link href="/apiary">
          <a>
            <div className="flex justify-start items-center">
              <ViewGridIcon className="w-12 text-beereign_silver" />
              <h2 className="ml-2 font-sans font-normal text-2xl">Apiarios</h2>
            </div>
          </a>
        </Link>
        <div className="">
          <Link href="/apiary/add">
            <a>
              <PlusIcon className="w-12 bg-beereign_green rounded-3xl text-white" />
            </a>
          </Link>
        </div>
      </section>
      <section className="ml-3 mt-5">
        <input
          id="name"
          name="name"
          type="text"
          className="w-input h-16 font-sans text-xl text-beereign_silver font-normal border border-beereign_silver rounded-lg shadow-md"
          placeholder="Nombre"
        />
      </section>
      <Pagination />
      <section className="mt-5 mx-3 flex justify-center">
        <table className="block overflow-x-auto">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
          <tr>
            <td>1</td>
            <td>Bajo Mono</td>
            <td>Boquete</td>
            <td>Editar | Eliminar</td>
          </tr>
          <tr>
            <td>2</td>
            <td>CA Caldera</td>
            <td>Caldera</td>
            <td>Editar | Eliminar</td>
          </tr>
        </table>
      </section>
    </>
  );
}
