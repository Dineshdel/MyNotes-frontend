import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

const Navbar = (value) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    const token = localStorage.getItem("token");

    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/logout`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async () => {
      const isTokenExists = await localStorage.getItem("token");
      if (isTokenExists) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  const handleDeleteAcc = () => {
    const token = localStorage.getItem("token");

    axios({
      url: `${process.env.REACT_APP_BACKEND_URL}/users/delete`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      console.log("User Account deleted");
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  console.log(value, "========");
  return (
    <div className="Navbar">
      <div className="NavTitle">
        <Link className="NavTitle" to="/dashboard">
          <h2 className="Titletext">MY-Notes</h2>
        </Link>
      </div>

      <div className="NavRouters">
        <Link className="NavRouters routes" to="/dashboard">
          <span className="routes">Dashboard</span>
        </Link>
      </div>
      <div className="NavBtns">
        <button className="CreateNote" onClick={handleLogOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
