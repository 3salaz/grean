import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import googleBtn from "../Images/btn_google_signin_dark_focus_web@2x.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container h-[86vh] flex items-center justify-cente mx-w-lg">
      <div className="container max-w-3xl mx-auto bg-white rounded-md md:drop-shadow-lg">
        <div className="w-full p-4 py-12 rounded-md">
          <div className="mx-auto w-full">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#75B657]">
              Sign in to your account
            </h2>
          </div>
          <div className="mt-8">
            <form className="space-y-4" onSubmit={signIn}>
              <label
                htmlFor="email"
                className="block text-md font-medium leading-6 text-[#75B657]"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter Your Email"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="https://google.com"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
              <div className="w-full flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-[#75B657] drop-shadow-2xl rounded-xl w-24 p-1 text-lg text-white shadow-2xl"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-500">
              Not a member?
              <a
                href="/signUp"
                className="pl-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
          <div className="w-full flex items-center justify-center gap-8 py-8">
            <a href="">
              <button className="w-48 h-16">
                <img
                  className="rounded-md drop-shadow-xl"
                  src={googleBtn}
                ></img>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
