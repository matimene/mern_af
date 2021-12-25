import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather";
import { fetchNews } from "../store/actions/newsActions";

const PageChanger = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.news);
  const { page, perPage } = store.params;
  const totalPages = Math.ceil(store.total / perPage);

  function handlePrevPage() {
    dispatch(fetchNews({ ...store.params, page: page - 1 }));
  }
  function handleNextPage() {
    dispatch(fetchNews({ ...store.params, page: page + 1 }));
  }
  return (
    <div className="flex justify-center align-middle py-3">
      {page !== 1 && (
        <ArrowLeftCircle
          className="cursor-pointer"
          size={20}
          onClick={() => handlePrevPage()}
        />
      )}
      <span className="text-sm font-bold px-3">{page}</span>
      {page !== totalPages && (
        <ArrowRightCircle
          className="cursor-pointer"
          size={20}
          onClick={() => handleNextPage()}
        />
      )}
    </div>
  );
};

export default PageChanger;
