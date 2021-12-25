import React from "react";
import { ToggleLeft, ToggleRight } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/actions/newsActions";

const TypeSwitcher = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.news);
  const { isArchived } = store.params;

  function handleTypeSwitch() {
    dispatch(fetchNews({ ...store.params, isArchived: !isArchived, page: 1 }));
  }
  return (
    <div className="align-middle flex justify-center py-5 uppercase">
      <span className={`${!isArchived && "font-bold"}`}>News</span>
      <div onClick={handleTypeSwitch} className="cursor-pointer mx-2">
        {isArchived ? <ToggleRight /> : <ToggleLeft />}
      </div>
      <span className={`${isArchived && "font-bold"}`}>Archived</span>
    </div>
  );
};

export default TypeSwitcher;
