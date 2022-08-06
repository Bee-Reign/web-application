import { useEffect, useState } from "react";
import { XIcon } from "@heroicons/react/solid";

import { getAllProducts } from "@service/api/product";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";
import Loading from "@components/Animation/Loading";
import useDebounce from "@utils/useDebounce";

export default function SearchProduct({
  showModal,
  onShowModalChange,
  onClick,
}) {
  const [products, serProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  const searchFilter = useDebounce(filter, 500);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      getAllProducts(searchFilter)
        .then((result) => {
          serProducts(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadProducts();
  }, [searchFilter]);

  if (showModal === false) return <></>;

  const searchItems = (value) => {
    setFilter(value);
  };

  const handleClose = () => {
    setFilter("");
    onShowModalChange(false);
  };

  const handleClick = (value) => {
    onClick(value);
    handleClose();
  };

  return (
    <section className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-4 w-full max-w-md overflow-x-auto max-h-screen sm:max-w-xl md:max-w-3xl md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg pb-4">
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3>Buscar producto</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <XIcon className="w-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <input
              type="search"
              autoFocus
              className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
              onChange={(e) => searchItems(e.target.value.toLocaleLowerCase())}
            />
          </div>
          <div className="h-64 max-h-64 overflow-y-auto mx-2 rounded-b-2xl">
            {loading === false ? (
              <table className="min-w-full divide-y divide-gray-200 table-fixed">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                    >
                      Producto
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
                    >
                      Código de Barra
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={`product-item-${product.id}`}
                      className="hover:bg-gray-100"
                      onClick={() => handleClick(product)}
                    >
                      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                        {capitalize(product?.name)}
                      </td>
                      <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                        {product.barcode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
