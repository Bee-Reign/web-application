import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ArchiveIcon, CashIcon, HomeIcon } from "@heroicons/react/solid";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";

import CheckPermission from "@utils/checkPermission";
import { getProducts } from "@service/api/product";
import { logError } from "@utils/logError";
import useDebounce from "@utils/useDebounce";
const AddProductModal = dynamic(() =>
  import("@components/Product/Modal/AddProductModal")
);
const Pagination = dynamic(() => import("@components/Pagination"));
const ProductTable = dynamic(() => import("@components/Product/Table"));

export default function Index() {
  CheckPermission("/product");
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [total, setTotal] = useState(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const searchFilter = useDebounce(filter, 500);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      getProducts(limit, page, searchFilter)
        .then((result) => {
          setProducts(result);
          result?.totalAmount ? setTotalAmount(result.totalAmount) : null;
          if (!total) {
            result?.count ? setTotal(result.count) : null;
          }
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, searchFilter, refresh]);

  const searchItems = (value = "") => {
    setFilter(value.trim());
  };

  const totalPages = Math.ceil(products?.count / limit);

  return (
    <>
      <Head>
        <title>Productos</title>
      </Head>
      <AddProductModal
        showModal={showAddModal}
        onAdd={(refresh) => setRefresh(refresh)}
        refresh={refresh}
        onShowModalChange={(showModal) => setShowAddModal(showModal)}
      />
      <section className="block justify-between items-center p-4 mx-4 mb-6 bg-white rounded-2xl shadow-xl shadow-gray-200 lg:p-5 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <nav className="flex mb-5">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link href="/home">
                    <a className="inline-flex items-center text-gray-700 hover:text-beereign_yellow cursor-default">
                      <HomeIcon className="w-5 mr-5" />
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="w-4 text-gray-400" />
                  </div>
                </li>
                <div className="ml-1 font-medium text-gray-400 md:ml-2 cursor-default">
                  Productos
                </div>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Inventario de productos
            </h1>
          </div>
          <div className="block items-center sm:flex md:divide-x md:divide-gray-100">
            <div className="mb-4 sm:pr-3 sm:mb-0">
              <div className="relative mt-1 sm:w-64 xl:w-96">
                <input
                  type="search"
                  autoFocus
                  className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-2 focus:ring-yellow-50 focus:border-beereign_yellow block w-full p-2.5 focus:outline-none"
                  placeholder="Buscar productos"
                  onChange={(e) =>
                    searchItems(e.target.value.toLocaleLowerCase())
                  }
                />
              </div>
            </div>
            <div className="flex items-center w-full sm:justify-end">
              <div className="hidden pl-2 space-x-1 md:flex"></div>
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-gradient-to-br from-green-800 to-green-600 sm:ml-auto shadow-md shadow-gray-300 hover:scale-105 cursor-default transition-transform"
              >
                <PlusIcon className="w-6 mr-2 -ml-1" />
                Agregar producto
              </button>
            </div>
          </div>
          <div className="block items-center mt-3">
            <div className="flex flex-col md:flex-row">
              <div className="flex items-center mb-1 md:mb-0 md:mr-2">
                <ArchiveIcon className="w-6 text-gray-900" />
                <span className="font-mono font-bold">{total}</span>
              </div>
              <div className="flex items-center">
                <CashIcon className="w-6 text-green-800" />
                <span className="font-mono font-bold">${totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col my-6 mx-4 rounded-2xl shadow-xl shadow-gray-200">
        <div className="bg-white rounded-t-2xl">
          <select
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="mx-3 font-mono form-select box bg-white text-gray-500 focus:outline-none"
          >
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div>
        <div className="overflow-x-auto rounded-b-2xl">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <ProductTable
                products={products?.rows}
                loading={loading}
                onChange={(deleted) => setRefresh(deleted)}
                refresh={refresh}
              />
            </div>
          </div>
        </div>
      </section>

      <Pagination
        loading={loading}
        page={page}
        limit={limit}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />
    </>
  );
}
