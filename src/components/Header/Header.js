import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Header(props) {
  const { employee } = props;

  return (
    <>
      <header className="w-full relative h-16 max-h-16 top-0 bg-beereign_bg xl:bg-beereign_clear">
        <div className="flex justify-between items-center h-full">
          <ul className="w-40 ml-3">
            <li>
              <Link href="/home">
                <a>
                  <Image
                    src="/logo.png"
                    width="165"
                    height="45"
                    alt="BeeReign logo"
                  />
                </a>
              </Link>
            </li>
          </ul>
          <ul className="flex mr-3 max-w-header_account 2xl:max-w-xs overflow-hidden items-center">
            <li>
              <Link href="/account">
                <a>
                  <div className="hidden xl:flex xl:items-center text-gray-700 hover:text-beereign_yellow">
                    <UserCircleIcon className="w-9 mr-1" />
                    <p className="font-serif text-lg capitalize">
                      {employee.name}
                    </p>
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
