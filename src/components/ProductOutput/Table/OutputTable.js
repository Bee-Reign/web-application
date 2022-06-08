import { useState } from "react";
import { BanIcon, CashIcon } from "@heroicons/react/outline";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import YesNoModal from "@components/Modal/YesNoModal";
import { cancelOutput } from "@service/api/productOutput";
import { toast } from "react-toastify";
import { logError } from "@utils/logError";
import EditStatus from "@components/ProductOutput/Modal/EditStatus";

export default function OutputTable({
  productOutputs = [],
  onChange,
  refresh,
  loading,
}) {
  const [showModal, setShowModal] = useState(false);
  const [showYesNoModal, setYesNoModal] = useState(false);
  const [id, setID] = useState(null);
  const [output, setOutput] = useState(null);
  if (loading == true) {
    return <Loading />;
  } else if (productOutputs.length === 0) {
    return (
      <h3 className="text-center font-mono text-2xl">
        no se encontró ningún registro
      </h3>
    );
  }

  const handleCancell = async () => {
    if (id) {
      cancelOutput(id)
        .then((res) => {
          onChange(!refresh);
          toast.success("Salida de Producto Cancelada ");
        })
        .catch((err) => {
          logError(err);
        });
    }
  };
  return (
    <>
      <YesNoModal
        showModal={showYesNoModal}
        message={"¿Desea Cancelar la Salida?"}
        onShowModalChange={(showModal) => setYesNoModal(showModal)}
        onYes={() => handleCancell()}
      />
      <EditStatus
        showModal={showModal}
        onShowModalChange={(showModal) => setShowModal(showModal)}
        productOutput={output}
        onChange={() => onChange(!refresh)}
      />
      <table className="min-w-full border text-center">
        <thead className="border-b">
          <tr>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Salida #
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Registrado Por
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Fecha
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Tipo de Venta
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Pagado
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Total
            </th>
            <th scope="col" className="font-mono text-black px-6 py-4 border-r">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {productOutputs.map((productOutput) => (
            <tr
              key={`Product-Output-item-${productOutput.id}`}
              className="border-b"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r">
                {productOutput.id}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {capitalize(productOutput.employee.name)}{" "}
                {capitalize(productOutput.employee.lastName)}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productOutput.createdAt}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productOutput.typeOfSale}
              </td>
              <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                {productOutput.isPaid === true ? "Sí" : "No"}
              </td>
              <td className="font-mono text-gray-900 px-6 py-4 whitespace-nowrap border-r">
                ${productOutput.amount}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center">
                  <div
                    onClick={() => {
                      setOutput(productOutput);
                      setShowModal(true);
                    }}
                  >
                    <CashIcon className="w-9 bg-gray-200 rounded-lg text-beereign_grey xl:hidden" />
                    <button
                      type="button"
                      className="hidden xl:inline-block px-6 py-2.5 bg-gray-200 text-beereign_grey font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Cambiar Estado de Pago
                    </button>
                  </div>
                  <div
                    onClick={() => {
                      setYesNoModal(true);
                      setID(productOutput.id);
                    }}
                    className="ml-4"
                  >
                    <BanIcon className="w-9 bg-gray-200 text-red-500 xl:hidden" />
                    <div className="hidden xl:inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out">
                      Cancelar
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
