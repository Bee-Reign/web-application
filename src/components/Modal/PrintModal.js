import { useRef } from "react";
import Image from "next/image";
import Barcode from "jsbarcode-react";
import ReactToPrint from "react-to-print";

export default function PrintModal({ showModal, item, onShowLabelChange }) {
  const componentRef = useRef();
  if (showModal === false) return <></>;

  const handleClose = () => {
    onShowLabelChange(false);
  };

  return (
    <div className="z-10 mt-16 absolute inset-0 flex items-center justify-center bg-beereign_bg bg-opacity-80">
      <div className="px-5 w-full max-w-md md:h-auto">
        <div className="relative bg-white text-gray-900 rounded-xl shadow">
          <div className="flex justify-center pt-5">
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                  Imprimir
                </button>
              )}
              content={() => componentRef.current}
            />
            <button
              onClick={() => handleClose()}
              className="ml-5 bg-gray-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-gray-500 hover:bg-transparent hover:text-gray-500 transition-all duration-300"
            >
              Cerrar
            </button>
          </div>
          <div className="pt-12 text-center overflow-hidden" ref={componentRef}>
            <Image
              src="https://res.cloudinary.com/bayyand/image/upload/v1648776515/IsotipoR_ndsp5r.png"
              width="120"
              height="120"
              alt="Company Logo"
            />
            <h2 className="text-2xl font-serif">Company Name</h2>
            <div className="pt-6">
              <h3 className="text-xl font-mono">{item.name}</h3>
              <Barcode
                value={item.id}
                className="mx-auto"
                options={{
                  fontSize: 22,
                  format: "code128",
                }}
                renderer="image"
              />
            </div>
            <h3 className="pt-2 text-xl">
              Lote # <span className="font-bold font-serif">{item.id}</span>
            </h3>
            <h3 className="pt-2 text-xl">
              Cantidad:{" "}
              <span className="font-bold font-mono">{item.quantity}</span>
            </h3>
            <div className="pt-12 mr-5">
              <div className="flex justify-end items-center">
                <p className="mr-2">Powered By</p>
                <Image
                  src="/logo.png"
                  width="130"
                  height="30"
                  alt="BeeReign logo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
