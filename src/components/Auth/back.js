import Image from "next/image"
<div className="h-screen bg-slate-50 flex justify-center items-center w-full">
  <form onSubmit={submitHandler}>
    <div className="bg-white px-8 py-8 rounded-xl w-screen shadow-md max-w-sm">
      <Image className="h-14 mb-4 mx-auto" alt="BeeReign" src={logo} />
      <div className="space-y-4">
        <h1 className="text-center text-2xl font-semibold text-gray-600">
          Login
        </h1>
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Email Address
          </label>
          <input
            type="text"
            className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Password
          </label>
          <input
            type="text"
            className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
          />
        </div>
      </div>
      <button className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide">
        Log In
      </button>
    </div>
  </form>
</div>;
