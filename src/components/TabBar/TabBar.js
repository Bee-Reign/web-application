import {
  HomeIcon,
  UserCircleIcon,
  ClipboardListIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

export default function TabBar() {
  return (
    <section className="md:hidden w-full h-20 border-t-2 bottom-0 sticky bg-white items-center flex justify-between">
      <div>
        <ClipboardListIcon
          className="h-11 w-11 text-beereign_silver ml-3"
          aria-hidden="true"
        />
      </div>
      <Link href="/home">
        <a>
          <div>
            <HomeIcon
              className="h-11 w-11 text-beereign_yellow"
              aria-hidden="true"
            />
          </div>
        </a>
      </Link>
      <Link href="/account">
        <a>
          <div>
            <UserCircleIcon
              className="h-11 w-11 text-beereign_silver mr-3"
              aria-hidden="true"
            />
          </div>
        </a>
      </Link>
    </section>
  );
}
