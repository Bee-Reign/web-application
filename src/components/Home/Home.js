import { HomeIcon } from "@heroicons/react/solid";

import {
  ViewGridIcon,
  TemplateIcon,
  ArchiveIcon,
  CubeTransparentIcon,
  CollectionIcon,
} from "@heroicons/react/outline";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="ml-3 mt-4 flex items-center justify-start">
        <Link href="/home">
          <a>
            <HomeIcon
              className="h-11 w-11 text-beereign_silver"
              aria-hidden="true"
            />
          </a>
        </Link>
        <h2 className="ml-2 font-sans font-light text-2xl">Home</h2>
      </section>
      {/* ---------- Modules ---------- */}
      <section className=" mt-5">
        <div className="bg-beereign_grey mx-3 mb-5 h-28 rounded-lg shadow-md">
          <Link href="/apiary">
            <a>
              <div className="flex justify-between items-center h-full w-full">
                <ViewGridIcon
                  className="w-20 text-beereign_ligth"
                  aria-hidden="true"
                />
                <span className="text-beereign_yellow font-sans font-light text-2xl mr-2">
                  Apiarios
                </span>
              </div>
            </a>
          </Link>
        </div>

        <div className="bg-beereign_grey mx-3 mb-5 h-28 rounded-lg shadow-md">
          <a>
            <div className="flex justify-between items-center h-full w-full">
              <CubeTransparentIcon className="w-20 text-beereign_ligth" />
              <span className="text-beereign_yellow font-sans font-light text-2xl mr-2">
                Abejas Reinas
              </span>
            </div>
          </a>
        </div>

        <div className="bg-beereign_grey mx-3 mb-5 h-28 rounded-lg shadow-md">
          <a>
            <div className="flex justify-between items-center h-full w-full">
              <ArchiveIcon
                className="w-20 text-beereign_ligth"
                aria-hidden="true"
              />
              <span className="text-beereign_yellow font-sans font-light text-2xl mr-2">
                Colmenas
              </span>
            </div>
          </a>
        </div>

        <div className="bg-beereign_grey mx-3 mb-5 h-28 rounded-lg shadow-md">
          <a>
            <div className="flex justify-between items-center h-full w-full">
              <TemplateIcon
                className="w-20 text-beereign_ligth"
                aria-hidden="true"
              />
              <span className="text-beereign_yellow font-sans font-light text-2xl mr-2">
                Materias Primas
              </span>
            </div>
          </a>
        </div>

        <div className="bg-beereign_grey mx-3 mb-5 h-28 rounded-lg shadow-md">
          <a>
            <div className="flex justify-between items-center h-full w-full">
              <CollectionIcon className="w-20 text-beereign_ligth" />
              <span className="text-beereign_yellow font-sans font-light text-2xl mr-2">
                Envasado
              </span>
            </div>
          </a>
        </div>

        <div className="bg-beereign_grey mx-3 mb-5 h-28 rounded-lg shadow-md">
          <a>
            <div className="flex justify-between items-center h-full w-full">
              <CollectionIcon className="w-20 text-beereign_ligth" />
              <span className="text-beereign_yellow font-sans font-light text-2xl mr-2">
                Productos
              </span>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
