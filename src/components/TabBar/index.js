import {
  HomeIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

export default function TabBar() {
  return (
    <footer>
      <div className="w-full h-16 bottom-0 xl:h-8 bg-white xl:bg-beereign_clear flex items-center justify-between xl:justify-center">
        <div className="xl:hidden">
          <ClipboardDocumentListIcon className="w-9 md:w-10 text-gray-500 ml-3 opacity-20" />
        </div>
        <div className="xl:hidden">
          <Link href="/home">
            <a>
              <div>
                <HomeIcon className="w-9 md:w-10 text-beereign_yellow" />
              </div>
            </a>
          </Link>
        </div>

        <div className="hidden xl:inline text-center">
          <h3 className="font-mono">
            © 2022 ·{" "}
            <a
              href="https://github.com/BeeReign"
              target="_blank"
              rel="noreferrer"
            >
              <span className="font-semibold hover:text-beereign_yellow">
                BeeReign ·{" "}
              </span>
            </a>
            0.3.0
          </h3>
        </div>

        <div className="xl:hidden items-center flex">
          <Link href="/account">
            <a className="mr-3">
              <div>
                <UserCircleIcon className="w-9 md:w-10 text-gray-700" />
              </div>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
