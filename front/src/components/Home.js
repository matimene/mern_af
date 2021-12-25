import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { fetchNews } from "../store/actions/newsActions";
import { isUserLoggedIn } from "../utils";
import Navbar from "./Navbar";
import NewsList from "./NewsList";
import Pagination from "./Pagination";
import TypeSwitcher from "./TypeSwitcher";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews({ page: 1, perPage: 10, isArchived: false }));
  }, [dispatch]);

  if (!isUserLoggedIn()) return <Navigate to="/login" />;
  return (
    <div className="">
      <Navbar />
      <TypeSwitcher />
      <NewsList />
      <Pagination />
    </div>
  );
};

export default Home;
