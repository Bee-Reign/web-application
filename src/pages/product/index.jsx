import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { getProducts } from "@service/api/product";
import Pagination from "@components/Pagination";
import { logError } from "@utils/logError";

const PRODUCT_LIMIT = 15;

import ProductTable from "@components/Product/Table";
import Head from "next/head";
import NewButton from "@components/Button/NewButton";
import CheckPermission from "@utils/checkPermission";

export default function Index() {
  CheckPermission("/product");
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      getProducts(PRODUCT_LIMIT, page, filter)
        .then((result) => {
          setProducts(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadProducts();
  }, [page, filter, refresh]);

  const searchItems = (value) => {
    setFilter(value);
  };

  const totalPages = Math.ceil(products?.count / PRODUCT_LIMIT);
  return (
    <>
      <Head>
        <title>Productos - BeeReign</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/home">
            <a>
              <HomeIcon className="w-9 text-beereign_grey" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">Productos</div>
        </div>
        <div className="">
          <NewButton label={"Registrar Producto"} path={"/product/add"} />
        </div>
      </section>

      <section className="mx-3 xl:mx-6 mt-5">
        <div className="flex justify-center xl:justify-start">
          <div className="w-full xl:w-3/4 2xl:w-1/2">
            <div className="input-group relative flex items-stretch w-full mb-4 rounded">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-3 text-base font-light text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-white focus:border-beereign_yellow focus:outline-none"
                placeholder="Buscar Producto..."
                onChange={(e) =>
                  searchItems(e.target.value.toLocaleLowerCase())
                }
              />
            </div>
          </div>
        </div>
      </section>

      <Pagination
        loading={loading}
        page={page}
        limit={PRODUCT_LIMIT}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

      <section className="mt-6 mx-3 xl:mx-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <ProductTable
                  products={products?.rows}
                  loading={loading}
                  onDelete={(deleted) => setRefresh(deleted)}
                  refresh={refresh}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {products?.rows?.length > 14 ? (
        <Pagination
          loading={loading}
          page={page}
          limit={APIARY_LIMIT}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
