import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { XIcon } from "@heroicons/react/solid";
import AsyncSelect from "react-select/async";

import { updateWarehouseSchema } from "@schema/warehouseSchema";
import { updateWarehouse } from "@service/api/warehouse";
import { getAllCountries, getAllProvincesById } from "@service/api/country";
import Button from "@components/Button";
import { logError } from "@utils/logError";
import capitalize from "@utils/capitalize";

export default function EditWarehouseModal({
  showModal,
  onShowModalChange,
  warehouse,
  onEdit,
  refresh,
}) {
  const formRef = useRef(null);
  const [country, setCountry] = useState(null);
  const [province, setProvince] = useState(null);
  const [loading, setLoading] = useState(false);
  let countryQuery = "";
  let provinceQuery = "";

  if (showModal === false) return <></>;

  const getCountries = () => {
    return getAllCountries(countryQuery)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        logError(err);
      });
  };

  const getProvinces = () => {
    return getAllProvincesById(country?.id, provinceQuery)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        logError(err);
      });
  };

  const onCountryInputChange = (value) => {
    countryQuery = value.toLocaleLowerCase();
  };

  const onProvinceInputChange = (value) => {
    provinceQuery = value.toLocaleLowerCase();
  };

  const handleChangeCountry = (value) => {
    setCountry(value);
    countryQuery = "";
  };

  const handleChangeProvince = (value) => {
    setProvince(value);
    provinceQuery = "";
  };

  const handleClose = () => {
    onShowModalChange(false);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      border: 0,
      boxShadow: "none",
    }),
  };

  const handleReset = () => {
    setProvince(null);
    setCountry(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("name").toLocaleLowerCase().trim(),
      countryId: country ? country?.id : warehouse?.country?.id,
      provinceId: province ? province?.id : warehouse?.province?.id,
      city: formData.get("city").toLocaleLowerCase().trim(),
    };
    const { error } = await updateWarehouseSchema.validate(data);

    if (error) {
      toast.error("" + error);
      setLoading(false);
      return null;
    }
    updateWarehouse(warehouse?.id, data)
      .then((response) => {
        formRef.current.reset();
        toast.success("Bodega actualizada");
        onEdit(!refresh);
        handleClose();
      })
      .catch((err) => {
        logError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto bg-beereign_bg bg-opacity-80">
      <div className="px-4 w-full max-w-md max-h-screen sm:max-w-xl md:max-w-3xl xl:max-w-4xl md:h-auto">
        <div className="relative bg-white rounded-2xl shadow-lg">
          <div className="flex justify-between items-start p-5 rounded-t border-b">
            <h3>Editar Bodega</h3>
            <button
              onClick={handleClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-2xl text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <XIcon className="w-5" />
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form className="w-full" ref={formRef} onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-full px-3">
                  <label
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    htmlFor="name"
                  >
                    Nombre:
                  </label>
                  <input
                    name="name"
                    required
                    defaultValue={capitalize(warehouse?.name)}
                    type="text"
                    maxLength={50}
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-100 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-3">
                <div className="w-full md:w-1/3 px-3 mb-5 md:mb-0">
                  <label
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    País:
                  </label>
                  <div className="relative">
                    <AsyncSelect
                      value={country}
                      className="appearance-none block w-full text-gray-900 focus-within:ring-yellow-100 focus-within:border-beereign_yellow shadow-sm border border-gray-300 rounded py-1 focus:outline-none"
                      styles={customStyles}
                      getOptionLabel={(e) => capitalize(e.name)}
                      getOptionValue={(e) => e.id}
                      loadOptions={getCountries}
                      onInputChange={onCountryInputChange}
                      cacheOptions
                      defaultOptions
                      placeholder={capitalize(warehouse?.country?.name, true)}
                      onChange={handleChangeCountry}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-5 md:mb-0">
                  <label
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                  >
                    Estado:
                  </label>
                  <div className="relative">
                    {country ? (
                      <AsyncSelect
                        value={province}
                        className="appearance-none block w-full text-gray-900 focus-within:ring-yellow-100 focus-within:border-beereign_yellow shadow-sm border border-gray-300 rounded py-1 focus:outline-none"
                        styles={customStyles}
                        getOptionLabel={(e) => capitalize(e.name)}
                        getOptionValue={(e) => e.id}
                        loadOptions={getProvinces}
                        onInputChange={onProvinceInputChange}
                        cacheOptions
                        placeholder={capitalize(
                          warehouse?.province?.name,
                          true
                        )}
                        onChange={handleChangeProvince}
                      />
                    ) : (
                      <AsyncSelect
                        className="appearance-none block w-full text-gray-900 focus-within:ring-yellow-100 focus-within:border-beereign_yellow shadow-sm border border-gray-300 rounded py-1 focus:outline-none"
                        styles={customStyles}
                        placeholder={capitalize(warehouse?.province?.name)}
                        value={province}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/3 px-3 mb-5 md:mb-0">
                  <label
                    className="block text-xs font-medium text-left text-gray-500 uppercase mb-1"
                    htmlFor="city"
                  >
                    Ciudad
                  </label>
                  <input
                    name="city"
                    type="text"
                    required
                    defaultValue={warehouse?.city}
                    maxLength={50}
                    className="appearance-none block w-full text-gray-900 focus:ring-yellow-50 focus:border-beereign_yellow shadow-sm border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="py-6 flex justify-center items-center rounded-b border-t border-gray-200">
                <Button onHandleReset={() => handleReset()} loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
