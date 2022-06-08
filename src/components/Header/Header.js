import Image from "next/image";
import { BellIcon, HomeIcon, UserCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Header(props) {
  const { employee } = props;

  return (
    <header className="w-full fixed h-16 max-h-16 top-0 bg-beereign_bg xl:bg-white md:shadow-md z-50">
      <nav className="flex justify-between items-center h-full">
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

        <ul className="hidden xl:flex max-w-3xl 2xl:max-w-5xl overflow-x-scroll scrollbar-hide">
          <li>
            <Link href="/home">
              <a>
                <HomeIcon
                  className="w-9 text-beereign_ligth mr-1"
                  aria-hidden="true"
                />
              </a>
            </Link>
          </li>
        </ul>

        <ul className="flex mr-3 max-w-header_account 2xl:max-w-xs overflow-hidden items-center">
          <li>
            <Link href="/account">
              <a>
                <div className="hidden xl:flex xl:items-center">
                  <UserCircleIcon className="w-9 text-beereign_silver mr-1" />
                  <p className="font-sans font-light text-lg capitalize">
                    {employee.name}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
