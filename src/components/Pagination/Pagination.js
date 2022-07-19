import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

const Pagination = ({ loading, page, limit, totalPages, onPageChange }) => {
  const firstPage = () => {
    if (page / limit + 1 > 1) {
      onPageChange(0);
    }
  };

  const previousPage = () => {
    if (page / limit + 1 > 1) {
      onPageChange(page - limit);
    }
  };

  const nextPage = () => {
    if (page / limit + 1 < totalPages) {
      onPageChange(page + limit);
    }
  };

  const lastPage = () => {
    if (page / limit + 1 < totalPages) {
      onPageChange((totalPages - 1) * limit);
    }
  };

  if (loading === true || totalPages === 0) return;

  return (
    <section className="items-center p-4 mx-4 bg-white rounded-2xl border border-gray-200 sm:flex sm:justify-between">
      <div className="flex items-center mb-4 sm:mb-0">
        <span className="text-sm font-normal text-gray-500">
          Mostrando página{" "}
          <span className="font-semibold text-gray-900">
            {page / limit + 1} de {totalPages}
          </span>{" "}
        </span>
      </div>
      <div className="flex items-center space-x-3 overflow-x-scroll sm:overflow-hidden">
        <a
          onClick={firstPage}
          className="inline-flex flex-1 justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg shadow-md shadow-gray-300 xl:hover:scale-105 transition-transform"
        >
          <ChevronDoubleLeftIcon className="mr-1 -ml-1 w-5 h-5" />
        </a>
        <a
          onClick={previousPage}
          className="cursor-default inline-flex flex-1 justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg shadow-md shadow-gray-300 xl:hover:scale-105 transition-transform"
        >
          <ChevronLeftIcon className="mr-1 -ml-1 w-5 h-5" />
          Anterior
        </a>
        <a
          onClick={nextPage}
          className="cursor-default inline-flex flex-1 justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg shadow-md shadow-gray-300 xl:hover:scale-105 transition-transform"
        >
          <ChevronRightIcon className="mr-1 -ml-1 w-5 h-5" />
          Siguiente
        </a>
        <a
          onClick={lastPage}
          className="inline-flex flex-1 justify-center items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg shadow-md shadow-gray-300 xl:hover:scale-105 transition-transform"
        >
          <ChevronDoubleRightIcon className="mr-1 -ml-1 w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default Pagination;
