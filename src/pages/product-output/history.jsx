import Head from "next/head";
import { useState, useEffect } from "react";
import { ViewGridIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Select from "react-select";

import { getProductOutputs } from "@service/api/productOutput";
import Pagination from "@components/Pagination";
import { logError } from "@utils/logError";
import ProductOutputTable from "@components/ProductOutput/Table/OutputTable";
import CheckPermission from "@utils/checkPermission";

const PRODUCT_OUTPUT_LIMIT = 15;

export default function History() {
  CheckPermission("/product-output");
  const [productOutputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [paid, setPaid] = useState(true);
  const [type, setType] = useState("CONTADO");
  const [refresh, setRefresh] = useState(false);

  const isPaidOptions = [
    { value: true, label: "Pagados" },
    { value: false, label: "Por Cobrar" },
  ];

  const typeOptions = [
    { value: "CONTADO", label: "CONTADO" },
    { value: "CRÉDITO", label: "CRÉDITO" },
  ];

  const handleChangePaid = (value) => {
    setPaid(value.value);
  };

  const handleChangeType = (value) => {
    if (value.value !== "CRÉDITO") setPaid(true);
    setType(value.value);
  };

  useEffect(() => {
    const loadBatches = async () => {
      setLoading(true);
      getProductOutputs(PRODUCT_OUTPUT_LIMIT, page, paid, type)
        .then((result) => {
          setOutputs(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadBatches();
  }, [page, paid, type, refresh]);
  const totalPages = Math.ceil(productOutputs?.count / PRODUCT_OUTPUT_LIMIT);
  return (
    <>
      <Head>
        <title>Historial de Salidas</title>
      </Head>
      <section className="mx-3 xl:mx-6 flex items-center justify-between">
        <div className="flex justify-start items-center">
          <Link href="/product-output">
            <a>
              <ViewGridIcon className="w-9 text-beereign_grey hover:text-beereign_yellow" />
            </a>
          </Link>
          <div className="ml-2 font-sans font-normal text-3xl">
            Historial de Salidas
          </div>
        </div>
      </section>

      <Pagination
        loading={loading}
        page={page}
        limit={PRODUCT_OUTPUT_LIMIT}
        totalPages={totalPages}
        onPageChange={(page) => setPage(page)}
      />

      <section className="mt-6 mx-3 xl:mx-6 flex justify-end">
        <div>
          <Select
            defaultValue={typeOptions[0]}
            onChange={handleChangeType}
            options={typeOptions}
            isSearchable={false}
          />
        </div>
        {type === "CRÉDITO" ? (
          <div className="ml-1">
            <Select
              defaultValue={isPaidOptions[0]}
              onChange={handleChangePaid}
              options={isPaidOptions}
              isSearchable={false}
            />
          </div>
        ) : (
          <></>
        )}
      </section>
      <section className="mt-1 mx-3 xl:mx-6">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <ProductOutputTable
                  productOutputs={productOutputs?.rows}
                  loading={loading}
                  onChange={(cancel) => setRefresh(cancel)}
                  refresh={refresh}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {productOutputs?.rows?.length > 14 ? (
        <Pagination
          loading={loading}
          page={page}
          limit={PRODUCT_OUTPUT_LIMIT}
          totalPages={totalPages}
          onPageChange={(page) => setPage(page)}
        />
      ) : (
        <></>
      )}
    </>
  );
}
