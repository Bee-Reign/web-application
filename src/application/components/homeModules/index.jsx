import Link from "next/link";
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

export default function HomeModules({ modules }) {
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
    <>
      {modules.map((module) => (
        <div key={module.id}>
          <Link href={`/${module.path}`} className="cursor-default">
            <div className="bg-white shadow-md shadow-gray-300 rounded-2xl p-4 hover:transition-transform hover:scale-105">
              <div className="flex justify-between items-center h-full w-full">
                <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-beereign_yellow to-beereign_silver rounded-lg shadow-md shadow-gray-300">
                  <FontAwesomeIcon className="w-5" icon={icons[module.path]} />
                </div>

                <span className="flex flex-1 justify-end items-center ml-5 w-0 text-base font-bold text-gray-900">
                  {capitalize(module.name, false)}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
