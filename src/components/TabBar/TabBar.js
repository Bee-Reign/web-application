import {
  HomeIcon,
  UserCircleIcon,
  ClipboardListIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

export default function TabBar() {
  return (
    <div className="w-full h-20 border-t-2 bottom-0 fixed xl:relative xl:border-t-0 xl:h-8 bg-white xl:bg-beereign_clear flex items-center justify-between xl:justify-center">
      <div className="xl:hidden">
        <ClipboardListIcon
          className="w-12 md:w-14 text-beereign_ligth ml-3"
          aria-hidden="true"
        />
      </div>
      <div className="xl:hidden">
        <Link href="/home">
          <a>
            <div>
              <HomeIcon
                className="w-12 md:w-14 text-beereign_yellow"
                aria-hidden="true"
              />
            </div>
          </a>
        </Link>
      </div>

      <div className="hidden xl:inline text-center">
        <h3 className="font-mono" >© 2022, <a href="https://github.com/Bee-Reign" target="_blank" rel="noreferrer"><span className="font-semibold">BeeReign.</span></a> Version Alpha.1.0</h3>
      </div>

      <div className="xl:hidden items-center flex">
        <Link href="/account">
          <a className="mr-3">
            <div>
              <UserCircleIcon
                className="w-12 md:w-14 text-beereign_ligth"
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
