import Button from "application/common/button/normal";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function Company() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-full">
            <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
              Nombre de la empresa
            </label>
            <input
              type="text"
              required
              name="company"
              placeholder="Your Company Name"
              className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
              Logo de la empresa
            </label>
            <div className="flex justify-start items-center mt-4 w-full">
              <label className="border border-gray-300 border-dashed hover:border-beereign_yellow">
                <ArrowUpTrayIcon className="w-10 text-gray-400 hover:scale-110" />
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div className="col-span-full">
            <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
              Sitio Web
            </label>
            <input
              type="text"
              required
              name="website"
              placeholder="your-company.com"
              className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              name="email"
              placeholder="contact@yourdomain.com"
              className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
              Teléfono
            </label>
            <input
              type="text"
              required
              name="phone"
              className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            />
          </div>
          <div className="col-span-full">
            <label className="block text-xs font-medium text-left text-gray-500 uppercase mb-1">
              Dirección
            </label>
            <textarea
              rows={3}
              name="address"
              maxLength={255}
              required
              placeholder="0000 Random Park, Panamá"
              className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            />
          </div>

          <div className="col-span-6 sm:col-full flex justify-center items-center">
            <Button loading={false} />
          </div>
        </div>
      </form>
    </>
  );
}
