import { HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { ViewGridIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

import useAuth from "@hooks/useAuth";

export default function Aside() {
  const router = useRouter();
  const {
    auth: { employee },
  } = useAuth();

  function comparePath(str, path) {
    const strArray = str.split("/");
    if (`/${strArray[1]}` === path) return true;
    return false;
  }
  return (
    <aside className="hidden xl:flex left-0 z-20 flex-col flex-shrink-0 w-64 overflow-y-auto xl:max-h-xl_height duration-200 transition-width">
      <div className="flex relative flex-col flex-1 pt-8 min-h-0 bg-beereign_clear">
        <div className="flex flex-col flex-1 pb-4">
          <div className="flex-1 bg-gray-50 px-3">
            <ul className="pb-2">
              <li>
                <Link href="/home">
                  <a className="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200 group transition-all duration-200 cursor-default">
                    <div className="bg-white shadow-lg shadow-gray-300  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center">
                      <HomeIcon className="w-3" />
                    </div>
                    <span className="ml-3 text-dark-500 text-sm font-light">
                      Home
                    </span>
                  </a>
                </Link>
              </li>
              {employee?.modules.map((module) => (
                <li key={module.id}>
                  <Link href={module.path}>
                    {comparePath(router?.pathname, module?.path) === true ? (
                      <a className="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg bg-white shadow-md">
                        <div className="bg-beereign_yellow shadow-lg shadow-gray-300  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center">
                          <ViewGridIcon className="w-3" />
                        </div>
                        <span className="ml-3 text-dark-500 text-sm font-light">
                          {module.name}
                        </span>
                      </a>
                    ) : (
                      <a className="flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg hover:bg-gray-200">
                        <div className="bg-white shadow-lg shadow-gray-300  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center">
                          <ViewGridIcon className="w-3" />
                        </div>
                        <span className="ml-3 text-dark-500 text-sm font-light">
                          {module.name}
                        </span>
                      </a>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}
