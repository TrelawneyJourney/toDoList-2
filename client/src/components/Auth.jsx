import { useState } from "react";
import IconX from "./IconX";

const Auth = () => {
  const [isLogIn, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  // const isLogIn = false;
  const viewLogin = (status) => {
    setError(null);
    setIsLogin(status);
  };
  return (
    <div className="auth-container flex justify-center">
      {/* <div className="auth-container-box border border-td7">
        <form action="">
          <h2>{isLogIn ? "Please log in" : "Please sign in!"}</h2>

          <input type="email" placeholder="email" />

          <input type="password" placeholder="password" />

          {!isLogIn && <input type="password" placeholder="confirm password" />}

          <button type="submit" className="">
            Submit
          </button>

          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{ background: !isLogIn ? "bg-td1" : "bg-td9" }}
          >
            Sign Up
          </button>
          <button onClick={() => viewLogin(true)}>Login</button>
        </div>
      </div> */}

      <div className="bg-white p-6 w-full max-w-md max-h-full shadow-2xl border border-td1 rounded-lg">
        {/* <!-- Modal header --> */}
        <div className="flex items-center justify-between p-2 md:p-4 border-b rounded-t  border-td1">
          <h3 className="text-xl font-semibold text-gray-600 ">
            {isLogIn ? "Log in to our platform" : "Sign in to our platform"}
          </h3>
          <IconX color="text-gray-300" />
        </div>

        {/* <!-- Modal body --> */}
        <div className="p-4 md:p-5">
          <form className="space-y-4" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-500 "
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-text"
                placeholder="youremail@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-500 "
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="input-text"
                required
              />
            </div>

            {!isLogIn && (
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-500 "
                >
                  Confirm your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="input-text"
                  required
                />
              </div>
            )}

            {isLogIn && (
              <div className="flex justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-td1"
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-500 "
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-td4 hover:underline 0">
                  Lost Password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full text-white bg-td6 hover:bg-td5 focus:ring-4 focus:outline-none focus:ring-td5 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {isLogIn ? "Login to your account" : "Create account"}
            </button>

            {isLogIn && (
              <div className="text-sm font-medium text-gray-500 ">
                Not registered?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline 0"
                  onClick={() => viewLogin(false)}
                >
                  Create account
                </a>
              </div>
            )}

            {!isLogIn && (
              <div className="text-sm font-medium text-gray-500 ">
                Registered?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline 0"
                  onClick={() => viewLogin(true)}
                >
                  Log in
                </a>
              </div>
            )}
            {error && <p>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
