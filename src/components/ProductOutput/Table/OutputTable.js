import { useState } from "react";
import { CashIcon } from "@heroicons/react/24/outline";

import Loading from "@components/Animation/Loading";
import capitalize from "@utils/capitalize";
import EditStatus from "@components/ProductOutput/Modal/EditStatus";

export default function OutputTable({
  productOutputs = [],
  onChange,
  refresh,
  loading,
}) {
  const [showModal, setShowModal] = useState(false);
  const [output, setOutput] = useState(null);
  if (loading == true) {
    return <Loading />;
  } else if (productOutputs.length === 0) {
    return (
      <h3 className="text-center bg-white text-gray-500">
        no se encontró ningún registro
      </h3>
    );
  }

  return (
    <>
      <EditStatus
        showModal={showModal}
        onShowModalChange={(showModal) => setShowModal(showModal)}
        productOutput={output}
        onChange={() => onChange(!refresh)}
      />
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-white">
          <tr>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Fecha
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Salida
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Registrado Por
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Tipo de Venta
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Pagado
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            >
              Total
            </th>
            <th
              scope="col"
              className="p-4 text-xs font-medium text-left text-gray-500 uppercase lg:p-5"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productOutputs.map((productOutput) => (
            <tr
              key={`product-output-item-${productOutput.id}`}
              className={`hover:bg-gray-100 ${
                productOutput.isPaid === false ? "bg-yellow-50" : ""
              }`}
            >
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {productOutput.createdAt}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                {productOutput.id}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {capitalize(productOutput.employee.name)}{" "}
                {capitalize(productOutput.employee.lastName)}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {productOutput.typeOfSale}
              </td>
              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                {productOutput.isPaid === true ? "Sí" : "No"}
              </td>
              <td className="p-4 text-sm font-mono text-gray-500 whitespace-nowrap lg:p-5">
                ${productOutput.amount}
              </td>
              <td className="p-4 space-x-2 whitespace-nowrap lg:p-5">
                <div className="flex justify-center">
                  <div className="flex items-center mr-3 hover:scale-110 cursor-default transition-transform">
                    {productOutput?.isPaid === false ? (
                      <button
                        onClick={() => {
                          setOutput(productOutput);
                          setShowModal(true);
                        }}
                        className="flex items-center text-green-600"
                      >
                        <CashIcon className="w-4 mr-1" />
                        Cambiar Estado de Pago
                      </button>
                    ) : (
                      <></>
                    )}
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
