export default function Button(props) {
  const { loading } = props;
  if (loading == true) {
    return (
      <button
        type="submit"
        className="px-24 py-4 bg-beereign_silver rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out"
      >
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-7 h-7 border-4 border-beereign_yellow border-solid rounded-full animate-spin"
        />
      </button>
    );
  }
  return (
    <>
      <button
        type="submit"
        className="px-14 py-4 bg-beereign_yellow text-yellow-100 font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-yellow-400 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
      >
        Guardar
      </button>
      <input className="mt-5 xl:ml-5 px-16 py-4 bg-beereign_clear text-beereign_grey font-medium text-xl leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out" value="limpiar" type="reset"></input>
    </>
  );
}
