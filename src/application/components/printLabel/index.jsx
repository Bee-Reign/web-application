import { useRef } from "react";
import Image from "next/image";
import Barcode from "jsbarcode-react";
import ReactToPrint from "react-to-print";

export default function PrintLabel({ showModal, item, onShowLabelChange }) {
  const componentRef = useRef();
  if (showModal === false) return <></>;

  const handleClose = () => {
    onShowLabelChange(false);
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-5 w-full max-w-md max-h-screen md:h-auto">
        <div className="relative bg-white text-black rounded-xl shadow">
          <div className="flex justify-center pt-5">
            <ReactToPrint
              trigger={() => (
                <button className="text-white bg-gradient-to-br from-blue-600 to-blue-800 font-medium rounded-lg text-base inline-flex items-center px-6 py-3 text-center mr-5 shadow-md shadow-gray-300 hover:scale-105 transition-transform">
                  Imprimir
                </button>
              )}
              content={() => componentRef.current}
            />
            <button
              onClick={() => handleClose()}
              className="text-white bg-gradient-to-br from-gray-400 to-gray-600 font-medium rounded-lg text-base inline-flex items-center px-9 py-3 text-center shadow-md shadow-gray-300 hover:scale-105 transition-transform"
            >
              Cerrar
            </button>
          </div>
          <div
            className={
              item.name.length > 28
                ? "pt-5 px-2 text-center overflow-hidden"
                : "pt-12 px-2 text-center overflow-hidden"
            }
            ref={componentRef}
          >
            <div className="flex justify-center">
              <Image
                src="https://res.cloudinary.com/bayyand/image/upload/v1648776515/IsotipoR_ndsp5r.png"
                width="120"
                height="120"
                alt="Company Logo"
              />
            </div>
            <h2 className="uppercase text-2xl font-bold">
              Colmenares Aparicio S.A.
            </h2>
            <div className="pt-6">
              <h3 className=" uppercase text-xl font-bold">{item.name}</h3>
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
            <h3 className="pt-2 text-xl font-mono font-bold">
              Lot # <span className="uppercase">{item.id}</span>
            </h3>
            <h3 className="pt-2 text-xl">
              <span className="font-black">{item.time}</span>
            </h3>
            <div className="pt-12 mr-5">
              <div className="flex justify-end items-center">
                <p className="mr-2 font-bold">Powered By</p>
                <Image
                  src="/black-logo.png"
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
