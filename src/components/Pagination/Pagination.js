import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

export default function Pagination() {
  return (
    <section className="mt-8 flex justify-center">
      <div className="w-12 h-12 border flex items-center">
        <ChevronDoubleLeftIcon
          className="w-8 mx-auto text-beereign_silver"
          aria-hidden="true"
        />
      </div>
      <div className="w-12 h-12 border flex items-center">
        <ChevronLeftIcon
          className="w-8 mx-auto text-beereign_silver"
          aria-hidden="true"
        />
      </div>
      <div className="w-40 h-12 border flex items-center">
        <p className="mx-auto text-">Página 1 de 23</p>
      </div>
      <div className="w-12 h-12 border flex items-center">
        <ChevronRightIcon
          className="w-8 mx-auto text-beereign_silver"
          aria-hidden="true"
        />
      </div>
      <div className="w-12 h-12 border flex items-center">
        <ChevronDoubleRightIcon
          className="w-8 mx-auto text-beereign_silver"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
