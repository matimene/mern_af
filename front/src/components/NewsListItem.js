import React, { useState } from "react";
import { Archive, ArrowDownCircle, Trash } from "react-feather";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { eraseNews, toggleNews } from "../store/actions/newsActions";
import { parseDate } from "../utils";

const NewsListItem = ({ news }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  function handleDelete() {
    Swal.fire({
      title: "Atention",
      text: "Deleted news can't be restored!",
      icon: "warning",
      reverseButtons: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(eraseNews(news.id));
      }
    });
  }

  function toggleArchive() {
    dispatch(toggleNews(news));
  }

  console.log(news.description.length);

  return (
    <div className="flex flex-col pb-5 mx-10 bg-slate-200 rounded-lg my-3 px-10 py-10">
      <h1 className="text-3xl font-semibold uppercase pl-4 pb-2">
        {news.title}
      </h1>
      <div className="text-bold">
        <span className="font-semibold">By {news.author.username}</span>
        <span className="text-sm">, at {parseDate(news.date)}</span>
      </div>
      {news.description.length > 400 && !expanded ? (
        <div className="pt-2">
          <span>{news.description.slice(0, 400)} ...</span>
          <div
            className="font-bold cursor-pointer flex uppercase justify-center"
            onClick={() => setExpanded(true)}
          >
            expand
            <ArrowDownCircle />
          </div>
        </div>
      ) : (
        <div className="pt-2">{news.description}</div>
      )}
      <div className="flex justify-end pt-3">
        <Archive
          className="cursor-pointer mr-4"
          data-tooltip-target="tooltip-archive"
          data-tooltip-style="light"
          onClick={() => toggleArchive()}
        />
        <Trash className="cursor-pointer mr-4" onClick={() => handleDelete()} />
      </div>
    </div>
  );
};

export default NewsListItem;
