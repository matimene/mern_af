import React from "react";
import { useSelector } from "react-redux";
import PageChanger from "./PageChanger";

const Pagination = () => {
  const store = useSelector((state) => state.news);
  const { page, perPage } = store.params;
  const from = 1 + (page - 1) * perPage;
  const to = store.news.length + (page - 1) * perPage;

  return (
    <div className="text-sm text-center italic py-3">
      <span>
        Displaying {from}-{to} of {store.total}
      </span>
      <PageChanger />
    </div>
  );
};

export default Pagination;
