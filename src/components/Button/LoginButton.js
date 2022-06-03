export default function LoginButton({ loading, message }) {
  if (loading == true) {
    return (
      <button
        type="submit"
        className="relative w-11/12 mt-14 py-4 text-base font-medium rounded-md text-black bg-beereign_yellow hover:bg-yellow-300"
      >
        <div
          style={{ borderTopColor: "transparent" }}
          className="mx-auto w-7 h-7 border-4 border-beereign_clear border-solid rounded-full animate-spin"
        />
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="group relative w-11/12 mt-14 py-4 text-xl rounded-md text-black bg-beereign_yellow hover:bg-yellow-400"
    >
      <span>{message}</span>
    </button>
  );
}
