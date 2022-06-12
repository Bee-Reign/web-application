import { useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";

import { getAllProductBatchesByBarcode } from "@service/api/product";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";
import Loading from "@components/Animation/Loading";

export default function SearchProductBatch({
  showModal,
  onShowModalChange,
  onClick,
}) {
  const [batches, setBatches] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);

  if (showModal === false) return <></>;

  async function handleKeyPress(e) {
    const key = e.keyCode || e.which;
    if (key == 13) {
      e.preventDefault();
      setLoading(true);
      getAllProductBatchesByBarcode(barcode)
        .then((result) => {
          console.log(result);
          setBatches(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setBarcode("");
          setLoading(false);
        });
    }
  }

  const handleClose = () => {
    setBarcode("");
    onShowModalChange(false);
  };

  const handleClick = (value) => {
    onClick(value);
    handleClose();
  };

  return (
    <div className="z-10 absolute inset-0 flex items-center justify-center bg-beereign_bg bg-opacity-80">
      <div className="p-4 w-full max-w-md md:h-auto">
        <div className=" bg-beereign_clear text-gray-900 rounded-xl shadow px-5">
          <div className=" flex justify-center">
            <button
              type="button"
              className=" bg-transparent hover:text-beereign_yellow rounded-lg text-sm mx-auto"
            >
              <XCircleIcon className="w-10" onClick={() => handleClose()} />
            </button>
          </div>

          <div className="pb-2">
            <input
              type="search"
              autoFocus
              className="relative flex-auto min-w-0 block w-full px-3 py-3 text-base font-light text-black bg-beereign_clear bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-white focus:border-beereign_yellow focus:outline-none"
              placeholder="Escanear Código de Barra..."
              onKeyPress={handleKeyPress}
              onChange={(e) => setBarcode(e.target.value)}
            />
          </div>
          {loading === false ? (
            <div className="overflow-scroll w-full">
              <table className="min-w-full border text-center">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="font-mono text-black px-6 py-4 border-r"
                    >
                      Lote #
                    </th>
                    <th
                      scope="col"
                      className="font-mono text-black px-6 py-4 border-r"
                    >
                      Bodega
                    </th>
                    <th
                      scope="col"
                      className="font-mono text-black px-6 py-4 border-r"
                    >
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map((batch) => (
                    <tr
                      key={`Product-item-${batch.id}`}
                      className="border-b hover:bg-blue-200"
                      onClick={() => handleClick(batch)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                        {batch.id}
                      </td>
                      <td className="uppercase text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                        {capitalize(batch.warehouse.name)}
                      </td>
                      <td className="uppercase text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                        {batch.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
