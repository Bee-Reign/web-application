import { PlusIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function NewButton({ label, path }) {
  return (
    <Link href={path}>
      <a>
        <PlusIcon className="w-10 bg-beereign_green rounded-3xl text-white xl:hidden" />
        <button
          type="button"
          className="hidden xl:inline-block px-6 py-2.5 bg-green-500 text-white font-medium uppercase text-sm rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg transition"
        >
          {label}
        </button>
      </a>
    </Link>
  );
}
