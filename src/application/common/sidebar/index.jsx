import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faGear,
  faUserTie,
  faBoxOpen,
  faCartShopping,
  faUserGroup,
  faKaaba,
  faFileInvoice,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import capitalize from "@utils/capitalize";

import useAuth from "@hooks/useAuth";

export default function Sidebar({ sidebar }) {
  const router = useRouter();
  const {
    auth: { employee },
  } = useAuth();

  function comparePath(str, path) {
    const strArray = str.split("/");
    if (strArray[1] === `${path}`) return true;
    return false;
  }

  const icons = {
    warehouse: faWarehouse,
    config: faGear,
    customer: faUser,
    employee: faUserTie,
    packing: faKaaba,
    billing: faFileInvoice,
    "raw-material": faBoxOpen,
    product: faBoxOpen,
    sale: faCartShopping,
    "type-of-employee": faUserGroup,
  };
  return (
    <div
      className={`fixed xl:static z-30 xl:flex xl:flex-shrink-0 w-64 border-r-[1px] overflow-y-auto min-h-app_height max-h-app_height duration-200 transition-width ${
        sidebar === true ? "" : "-translate-x-full xl:-translate-x-0"
      } `}
    >
      <div className="flex relative flex-col flex-1 pt-4 bg-beereign_clear min-h-app_height">
        <div className="flex flex-col flex-1 pb-4">
          <div className="flex-1 bg-gray-50 px-3">
            <ul className="pb-2">
              <li>
                <Link
                  href="/home"
                  className={`${
                    router.pathname == "/home"
                      ? "bg-white"
                      : "hover:bg-gray-200"
                  } flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg group transition-all duration-200 cursor-default`}
                >
                  <div
                    className={`shadow-lg shadow-gray-300  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center ${
                      router?.pathname == "/home"
                        ? "bg-beereign_yellow"
                        : "bg-white"
                    }`}
                  >
                    <HomeIcon className="w-3" />
                  </div>
                  <span className="ml-3 text-dark-500 text-sm font-light">
                    Home
                  </span>
                </Link>
              </li>
              {employee?.modules.map((module) => (
                <li key={module.id}>
                  <Link href={`/${module.path}`} legacyBehavior>
                    <a
                      className={`${
                        comparePath(router?.pathname, module?.path) === true
                          ? "bg-white"
                          : "hover:bg-gray-200"
                      } flex items-center py-2.5 px-4 text-base font-normal text-dark-500 rounded-lg`}
                    >
                      <div
                        className={`${
                          comparePath(router?.pathname, module?.path) === true
                            ? "bg-beereign_yellow"
                            : "bg-white"
                        } shadow-lg shadow-gray-300  text-dark-700 w-8 h-8 p-2.5 mr-1 rounded-lg text-center grid place-items-center`}
                      >
                        <FontAwesomeIcon
                          className="w-3"
                          icon={icons[module.path]}
                        />
                      </div>
                      <span className="ml-3 text-dark-500 text-sm font-light">
                        {capitalize(module.name, false)}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
