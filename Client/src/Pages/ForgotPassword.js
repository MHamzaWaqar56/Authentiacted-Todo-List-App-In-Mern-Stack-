import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { forgotPassword } from "../ReduxToolKit/authSlice";
import Layout from "../Components/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // handleForgotPassword
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const result = await dispatch(forgotPassword({ email, answer, password }));

    console.log("result:", result);
    if (result.payload.success) {
      alert(result.payload.message);
      setEmail("");
      setAnswer("");
      setPassword("");
      navigate("/login");
    } else {
      alert(result.payload.error);
    }
  };

  return (
    <Layout title={"Forgot Password - TodoAPP"}>
      <Wrapper>
        <div className="main-div">
          <div className="container">
            <div className="inner-div">
              <div className="top-text">
                <h1>Recover Password</h1>
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
                    className=""
                    type="text"
                    placeholder="Enter Your Best Friend Name"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <br />
                  <input
                    className="pass-input"
                    type="password"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                  />

                  <br />

                  <button
                    type="submit"
                    onClick={handleForgotPassword}
                    className="submit-btn"
                  >
                    Submit
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

  .top-text h1 {
    font-size: 26px;
    padding: 20px 10px 20px 10px;
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

export default ForgotPassword;
