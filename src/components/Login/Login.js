import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css";
import Register from "../Register/Register";
import { Link, Location } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { username, password };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    })
      .then((res) => {
        console.log("User logged in");
        const token = res.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert("Invalid username or password");
        setUsername("");
        setPassword("");
      });
  };

  const RedirectRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <>
      <div className="Login">
        <h2 className="LoginTitle">MY-Notes</h2>
        <div className="LoginForm">
          <div className="LoginContainer">
            <form>
              <h2 className="LoginHead">Login to your account</h2>
              <div className="FormUsername">
                <input
                  type="text"
                  className="FormInput"
                  placeholder="Enter your username"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div className="FormPassword">
                <input
                  type="password"
                  className="FormInput"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="FormBtns">
                <button className="Btns" onClick={handleLogin}>
                  Login
                </button>
                <button className="Btns registerBtn" onClick={RedirectRegister}>
                  {" "}
                  Register{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
