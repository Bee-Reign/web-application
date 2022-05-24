import { ViewGridIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function HomeModules({ modules }) {
  return (
    <>
      {modules.map((module) => (
        <div
          key={module.id}
          className="bg-beereign_grey h-28 md:h-32 mx-3 mb-5 group relative overflow-hidden rounded-lg shadow-md"
        >
          <Link href={module.path}>
            <a>
              <div className="flex justify-between items-center h-full w-full">
                <ViewGridIcon
                  className="w-20 text-beereign_ligth"
                  aria-hidden="true"
                />
                <span className="text-beereign_yellow text-right font-light font-sans text-2xl mr-2">
                  {module.name}
                </span>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </>
  );
}
