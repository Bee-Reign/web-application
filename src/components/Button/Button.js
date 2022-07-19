export default function Button(props) {
  const { loading, reset = true, onHandleReset = null } = props;
  if (loading == true) {
    return (
      <button className="py-3 px-12 xl:px-16 bg-beereign_silver rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-700 active:shadow-lg transition duration-150 ease-in-out">
        <div
          style={{ borderTopColor: "transparent" }}
          className="w-5 h-5 border-4 border-beereign_yellow border-solid rounded-full animate-spin"
        />
      </button>
    );
  }
  return (
    <div className="flex items-center">
      <button
        type="submit"
        className="text-white bg-gradient-to-br from-green-600 to-green-800 font-medium rounded-lg text-base inline-flex items-center px-6 py-3 text-center mr-2 shadow-md shadow-gray-300 hover:scale-105 transition-transform"
      >
        Guardar
      </button>
      {reset === true ? (
        <input
          className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-300 font-medium inline-flex items-center rounded-lg text-base px-6 py-3 text-center hover:scale-105 transition-transform"
          value="Reiniciar"
          type="reset"
          onClick={() => {
            if (onHandleReset != null) onHandleReset();
          }}
        ></input>
      ) : (
        <></>
      )}
    </div>
  );
}
