import React, { useState } from "react";
import styled from "styled-components";
import { FaUserLarge } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { login } from "../ReduxToolKit/authSlice";
import Layout from "../Components/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));

    if (result.payload.success) {
      alert(result.payload.message);

      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      alert(result.payload.error);
    }
  };

  return (
    <Layout title={"Login - TodoAPP"}>
      <Wrapper>
        <div className="main-div">
          <div className="container">
            <div className="inner-div">
              <div className="top-text">
                <FaUserLarge className="icon" />
                <h1>User Login</h1>
              </div>
              <div className="form-div">
                <form className="reg-form">
                  <input
                    className="email-input"
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <br />
                  <input
                    className="pass-input"
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                  />

                  <p>
                    <NavLink to="/forgotpassword" className="forgot">
                      Forgot Password?
                    </NavLink>
                  </p>

                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="submit-btn"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.section`
  .main-div {
    width: 100%;
    // background-color: green;
  }

  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    background-color: #9ff39f;
    height: 600px;
  }

  .inner-div {
    position: relative;
    border-radius: 35px;
    z-index: 2;
    background-color: white;
    padding: 10px 50px;
    width: 50%;
  }

  .top-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
  }

  .icon {
    font-size: 150px;
    margin-top: 30px;
  }

  .top-text h1 {
    font-size: 26px;
    padding: 0px 10px 20px 6px;
    font-family: system-ui;
    font-weight: 800;
  }

  .form-div {
    width: 100%;
  }

  .reg-form {
    display: flex;
    flex-direction: column;
  }

  .reg-form input {
    width: 100%;
    padding: 12px;
    outline: none;
  }

  button {
    width: 100%;
    padding: 12px;
    margin-bottom: 30px;
  }

  .submit-btn {
    font-size: 18px;
    color: white;
    background-color: #13d6d7;
    border: 1px solid #13d6d7;
    cursor: pointer;
  }

  .submit-btn:hover {
    font-size: 18px;
    color: #13d6d7;
    background-color: white;
    cursor: pointer;
  }

  .forgot {
    color: black;
    text-decoration: none;
    font-family: system-ui;
  }

  p {
    margin: 5px 0px;
    font-family: system-ui;
    display: flex;
    justify-content: flex-end;
  }
`;

export default Login;
