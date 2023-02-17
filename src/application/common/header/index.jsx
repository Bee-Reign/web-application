import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Header({ employee, onSidebarChange, sidebarRef }) {
  const handleChangeSidebar = () => {
    onSidebarChange();
  };
  return (
    <>
      <header className="w-full border-b-[1px] border-slate-300 relative h-16 max-h-16 top-0 bg-beereign_clear">
        <div className="flex justify-between items-center h-full mx-5 xl:mx-7">
          <ul className="w-36">
            <li>
              <Link href="/home">
                <Image
                  src="/logo.png"
                  width="165"
                  height="45"
                  alt="BeeReign logo"
                  priority
                />
              </Link>
            </li>
          </ul>
          <ul className="flex max-w-header_account 2xl:max-w-xs overflow-hidden items-center">
            <li>
              <Link href="/account">
                <div className="hidden xl:flex xl:items-center text-gray-700 hover:text-beereign_yellow">
                  <UserCircleIcon className="w-9 mr-1" />
                  <p className="text-lg capitalize">{employee.name}</p>
                </div>
              </Link>
            </li>
            <Bars3Icon
              ref={sidebarRef}
              onClick={handleChangeSidebar}
              className="w-8 text-gray-600 xl:hidden"
            />
          </ul>
        </div>
      </header>
    </>
  );
}
