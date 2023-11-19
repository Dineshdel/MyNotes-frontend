import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./Register.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { username, password };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/users/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    })
      .then((res) => {
        console.log("New User created");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        alert(err);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <>
      <div className="Register">
        <h2 className="RegisterTitle">MY-Notes</h2>
        <div className="RegisterForm">
          <div className="RegisterContainer">
            <form>
              <h3 className="RegisterHead">Create your Account!</h3>
              <div className="FormUsername">
                <input
                  type="text"
                  className="FormInput"
                  placeholder="enter your username"
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
                  placeholder=" enter your password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="FormBtns">
                <button className="Btns registerBtn" onClick={handleRegister}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
