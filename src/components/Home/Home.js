import { HomeIcon } from "@heroicons/react/solid";

import { ViewGridIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="ml-3 flex items-center justify-start">
        <div>
          <HomeIcon
            className="w-9 text-beereign_grey"
            aria-hidden="true"
          />
        </div>
        <h2 className="ml-2 font-sans font-normal text-3xl">Home</h2>
      </section>
      {/* ---------- Modules ---------- */}
      <section className=" mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <div className="bg-beereign_grey h-28 md:h-32 mx-3 mb-5 group relative overflow-hidden rounded-lg shadow-md">
            <Link href="/apiary">
              <a>
                <div className="flex justify-between items-center h-full w-full">
                  <ViewGridIcon
                    className="w-20 text-beereign_ligth"
                    aria-hidden="true"
                  />
                  <span className="text-beereign_yellow text-right font-light font-sans text-2xl mr-2">
                    Apiarios
                  </span>
                </div>
              </a>
            </Link>
          </div>

          <div className="bg-beereign_grey h-28 md:h-32 mx-3 mb-5 group relative overflow-hidden rounded-lg shadow-md">
            <Link href="/raw-material">
              <a>
                <div className="flex justify-between items-center h-full w-full">
                  <ViewGridIcon
                    className="w-20 text-beereign_ligth"
                    aria-hidden="true"
                  />
                  <span className="text-beereign_yellow text-right font-light font-sans text-2xl mr-2">
                    Inventario de Materia Prima
                  </span>
                </div>
              </a>
            </Link>
          </div>

          <div className="bg-beereign_grey h-28 md:h-32 mx-3 mb-5 group relative overflow-hidden rounded-lg shadow-md">
            <Link href="/warehouse">
              <a>
                <div className="flex justify-between items-center h-full w-full">
                  <ViewGridIcon
                    className="w-20 text-beereign_ligth"
                    aria-hidden="true"
                  />
                  <span className="text-beereign_yellow text-right font-light font-sans text-2xl mr-2">
                    Bodegas
                  </span>
                </div>
              </a>
            </Link>
          </div>

          <div className="bg-beereign_grey h-28 md:h-32 mx-3 mb-5 group relative overflow-hidden rounded-lg shadow-md">
            <Link href="/raw-material-batch">
              <a>
                <div className="flex justify-between items-center h-full w-full">
                  <ViewGridIcon
                    className="w-20 text-beereign_ligth"
                    aria-hidden="true"
                  />
                  <span className="text-beereign_yellow text-right font-light font-sans text-2xl mr-2">
                    Lotes de Materia Prima
                  </span>
                </div>
              </a>
            </Link>
          </div>

          <div className="bg-beereign_grey h-28 md:h-32 mx-3 mb-5 group relative overflow-hidden rounded-lg shadow-md">
            <Link href="/packing">
              <a>
                <div className="flex justify-between items-center h-full w-full">
                  <ViewGridIcon
                    className="w-20 text-beereign_ligth"
                    aria-hidden="true"
                  />
                  <span className="text-beereign_yellow text-right font-light font-sans text-2xl mr-2">
                    Envasado
                  </span>
                </div>
              </a>
            </Link>
          </div>

          <div className="bg-beereign_grey h-28 md:h-32 mx-3 mb-5 group relative overflow-hidden rounded-lg shadow-md">
            <Link href="/product">
              <a>
                <div className="flex justify-between items-center h-full w-full">
                  <ViewGridIcon
                    className="w-20 text-beereign_ligth"
                    aria-hidden="true"
                  />
                  <span className="text-beereign_yellow text-right font-light font-sans text-2xl mr-2">
                    Inventario de Productos
                  </span>
                </div>
              </a>
            </Link>
          </div>

          <div className="bg-beereign_grey h-28 md:h-32 mx-3 mb-5 group relative overflow-hidden rounded-lg shadow-md">
            <Link href="/employee">
              <a>
                <div className="flex justify-between items-center h-full w-full">
                  <ViewGridIcon
                    className="w-20 text-beereign_ligth"
                    aria-hidden="true"
                  />
                  <span className="text-beereign_yellow text-right font-light font-sans text-2xl mr-2">
                    Empleados
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
