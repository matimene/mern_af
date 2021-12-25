import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../store/actions/newsActions";
import NewsListItem from "./NewsListItem";

const NewsList = () => {
  const store = useSelector((state) => state.news);
  const dispatch = useDispatch();

  if (!store.news.length)
    return (
      <div className="text-center my-5 font-bold">
        There are no news to display
      </div>
    );

  return (
    <div>
      {store.news.map((news) => (
        <NewsListItem key={news.id} news={news} />
      ))}
    </div>
  );
};

export default NewsList;
