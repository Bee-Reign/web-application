import { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";

import { getAllRawMaterials } from "@service/api/rawMaterial";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";
import Loading from "@components/Animation/Loading";

export default function SearchRawMaterial({
  showModal,
  onShowModalChange,
  onClick,
}) {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadRawMaterials = async () => {
      setLoading(true);
      getAllRawMaterials(filter)
        .then((result) => {
          setRawMaterials(result);
        })
        .catch((error) => {
          logError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    loadRawMaterials();
  }, [filter]);

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
    <div className="z-10 absolute inset-0 flex items-center justify-center bg-beereign_bg bg-opacity-80">
      <div className="p-4 w-full max-w-md md:h-auto">
        <div className="bg-beereign_clear text-gray-900 rounded-xl shadow px-5">
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
              className="relative flex-auto min-w-0 block w-full px-3 py-3 text-base font-light text-black bg-beereign_clear bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-white focus:border-beereign_yellow focus:outline-none"
              placeholder="Buscar Materia Prima..."
              onChange={(e) => searchItems(e.target.value.toLocaleLowerCase())}
            />
          </div>
          {loading === false ? (
            <table className="min-w-full border text-center">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="font-mono text-black px-6 py-4 border-r"
                  >
                    Materia Prima
                  </th>
                  <th
                    scope="col"
                    className="font-mono text-black px-6 py-4 border-r"
                  >
                    Código
                  </th>
                </tr>
              </thead>
              <tbody>
                {rawMaterials.map((rawMaterial) => (
                  <tr
                    key={`RawMaterial-item-${rawMaterial.id}`}
                    className="border-b hover:bg-blue-200"
                    onClick={() => handleClick(rawMaterial)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                      {capitalize(rawMaterial.name)}
                    </td>
                    <td className="uppercase text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                      {rawMaterial.code}
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
  );
}
