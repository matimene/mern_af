import React from "react";
import { CheckCircle, LogOut } from "react-feather";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../store/actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="text-white h-10 w-full bg-slate-700 flex justify-between mb-2">
      <button
        className="px-4 pt-1 m-1 ml-4 rounded text-sm bg-white text-black flex align-middle"
        onClick={() => navigate("/create")}
      >
        CREATE NEWS
        <CheckCircle className="pl-2" size={20} />
      </button>
      <button
        className="px-4 pt-1 m-1 mr-4 rounded text-sm bg-black flex align-middle"
        onClick={() => dispatch(logout())}
      >
        LOGOUT
        <LogOut className="pl-2" size={20} />
      </button>
    </div>
  );
};

export default Navbar;
