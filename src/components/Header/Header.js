import Image from "next/image";
import { BellIcon } from "@heroicons/react/outline";

import logo from "@static/logo.png";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-16 top-0 bg-beereign_bg">
      <nav className="flex justify-between items-center h-full">
        <ul className="w-40 ml-3">
          <li>
            <Link href="/home">
              <a>
                <Image src={logo} alt="BeeReign logo" />
              </a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <a>
              <BellIcon
                className="h-8 w-8 text-beereign_yellow mr-3"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
