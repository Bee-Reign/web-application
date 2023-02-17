import {
  HomeIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function TabBar() {
  return (
    <footer>
      <div className="w-full h-16 bottom-0 xl:h-8 bg-white xl:bg-beereign_clear flex items-center justify-between xl:justify-center">
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
      </div>
    </footer>
  );
}
