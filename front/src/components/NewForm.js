import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { createNewNews } from "../store/actions/newsActions";
import { isUserLoggedIn } from "../utils";

const NewForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createNewNews({ title, description }));
    setTitle("");
    setDescription("");
    navigate("/");
  }

  if (!isUserLoggedIn()) return <Navigate to="/login" />;

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
          <div className="mb-4 px-12 pt-12 w-96">
            <label
              className="block bg-slate-800 text-white uppercase text-center py-1 rounded text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              id="title"
              type="text"
              required={true}
              placeholder="Title of the news"
            />
          </div>
          <div className="mb-2 px-12">
            <label
              className="block bg-slate-800 text-white uppercase text-center py-1 rounded text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 h-56"
              id="description"
              type="text"
              required={true}
              placeholder="Content of the news"
            />
          </div>
          <div className="flex items-center justify-between pb-12">
            <button
              className="bg-slate-800 hover:bg-black text-white font-bold py-2 px-4 rounded m-auto"
              type="submit"
            >
              CREATE
            </button>
          </div>
          <div
            className="bg-black text-white hover:bg-white hover:text-black  font-bold py-2 px-4 rounded m-auto cursor-pointer"
            onClick={() => navigate("/")}
          >
            BACK TO LIST
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewForm;
