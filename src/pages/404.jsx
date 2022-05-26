import Link from "next/link";
import Image from "next/image";

const FourOhFour = () => {
  return (
    <div className="min-h-screen md:flex">
      <div className="flex items-center justify-center w-full py-10 bg-white md:w-1/2">
        <div className="max-w-md">
          <div className="text-5xl font-black text-gray-800 md:text-8xl">
            404
          </div>
          <div className="w-16 h-1 my-3 bg-beereign_yellow md:my-6" />
          <p className="text-2xl font-light leading-normal text-gray-600 md:text-3xl">
            Not Found
          </p>
          <Link href="/home">
            <a>
              <button className="px-4 py-2 mt-4 text-lg text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-100 focus:outline-none">
                Regresar
              </button>
            </a>
          </Link>
        </div>
      </div>
      <div className="relative w-full pb-full md:flex md:pb-0 md:min-h-screen md:w-1/2">
        <div className="flex items-center w-full h-full max-w-4xl mx-auto">
          <Image
            className="object-cover w-full"
            src="/not-fount.png"
            width="861"
            height="572"
            priority
            alt="Not Found Image"
          />
        </div>
      </div>
    </div>
  );
};

export default FourOhFour;
