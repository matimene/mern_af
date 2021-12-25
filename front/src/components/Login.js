import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { loginUser, signupUser } from "../store/actions/userActions";
import { isUserLoggedIn } from "../utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);

  function handleSubmit(e) {
    e.preventDefault();
    isNewUser
      ? dispatch(signupUser({ username, password }))
      : dispatch(loginUser({ username, password }));
  }

  if (isUserLoggedIn() || store) return <Navigate to="/" />;

  return (
    <div className="flex m-auto justify-center h-screen items-center">
      <form onSubmit={handleSubmit}>
        <div
          className="bg-white shadow-md rounded px-8 pt-14 pb-8 flex flex-col"
          style={{
            backgroundImage: `url("https://imagenes.lainformacion.com/files/article_amp/uploads/imagenes/2021/04/07/allfunds-confirma-su-salida-a-bolsa.png")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="mb-4 px-12 pt-12">
            <label
              className="block bg-slate-800 text-white uppercase text-center py-1 rounded text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="username"
              type="text"
              required={true}
              placeholder="Username"
            />
          </div>
          <div className="mb-2 px-12">
            <label
              className="block bg-slate-800 text-white uppercase text-center py-1 rounded text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              id="password"
              type="password"
              required={true}
              placeholder="******"
            />
          </div>
          {isNewUser ? (
            <div
              onClick={() => setIsNewUser(!isNewUser)}
              className="italic text-sm text-center pb-3 text-white"
            >
              Have an account?{" "}
              <span className="cursor-pointer font-bold">Login!</span>
            </div>
          ) : (
            <div
              onClick={() => setIsNewUser(!isNewUser)}
              className="italic text-sm text-center pb-3 text-white"
            >
              Do not have an account?{" "}
              <span className="cursor-pointer font-bold">Sign up!</span>
            </div>
          )}
          <div className="flex items-center justify-between pb-12">
            <button
              className="bg-slate-800 hover:bg-black text-white font-bold py-2 px-4 rounded m-auto"
              type="submit"
            >
              {isNewUser ? "SIGN UP" : "LOGIN"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
