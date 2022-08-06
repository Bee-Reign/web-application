import { ViewGridIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function HomeModules({ modules }) {
  return (
    <>
      {modules.map((module) => (
        <div key={module.id}>
          <Link href={module.path}>
            <a className="cursor-default">
              <div className="bg-white shadow-md shadow-gray-300 rounded-2xl p-4 hover:transition-transform hover:scale-105">
                <div className="flex justify-between items-center h-full w-full">
                  <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-beereign_yellow to-beereign_silver rounded-lg shadow-md shadow-gray-300">
                    <ViewGridIcon className="w-5" />
                  </div>

                  <span className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-gray-900">
                    {module.name}
                  </span>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </>
  );
}
