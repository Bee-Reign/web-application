import Image from "next/image";
import logo from "@static/logo.png";

const submitHandler = () => {
  console.log("enviado");
};

export default function LoginForm() {
  return (
    <div className="text-sm text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg bg-white rounded-3xl px-5 py-12">
        <Image src={logo} alt="BeeReign logo" />
        <div className="mt-7">
          <h1 className="font-semibold text-4xl">Login</h1>
        </div>
        <form className="mt-14">
          <div className="rounded-md shadow-sm">
            <div className="mb-14">
              <input 
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-4 border border-beereign_gray text-gray-900 rounded-md focus:outline-none sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-4 border border-beereign_gray  text-gray-900 focus:outline-none sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="text-sm text-left mt-5">
              <a
                href="#"
                className="font-medium text-beereign_gray hover:text-beereign_yellow"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            className="group relative w-11/12 mt-12 py-4 text-base font-medium rounded-md text-black bg-beereign_yellow hover:bg-yellow-400"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
