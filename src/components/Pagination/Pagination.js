import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

const Pagination = (props) => {
  const { page, limit, totalPages, onPageChange } = props;

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

  return (
    <section className="mt-5 flex justify-center xl:justify-start xl:ml-6">
      <a className="w-12 md:w-14 border flex items-center" onClick={firstPage}>
        <ChevronDoubleLeftIcon
          className="w-8 md:w-10 mx-auto text-beereign_silver"
          aria-hidden="true"
        />
      </a>
      <a
        className="w-12 md:w-14 border flex items-center"
        onClick={previousPage}
      >
        <ChevronLeftIcon
          className="w-8 md:w-10 mx-auto text-beereign_silver"
          aria-hidden="true"
        />
      </a>
      <div className="w-40 md:w-44 h-12 border flex items-center">
        <p className="mx-auto text-">
          Página {page / limit + 1} de {totalPages}
        </p>
      </div>
      <a className="w-12 md:w-14 border flex items-center" onClick={nextPage}>
        <ChevronRightIcon
          className="w-8 md:w-10 mx-auto text-beereign_silver"
          aria-hidden="true"
        />
      </a>
      <a className="w-12 md:w-14 border flex items-center" onClick={lastPage}>
        <ChevronDoubleRightIcon
          className="w-8 md:w-10 mx-auto text-beereign_silver"
          aria-hidden="true"
        />
      </a>
    </section>
  );
};

export default Pagination;
