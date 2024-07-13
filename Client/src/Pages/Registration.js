import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Styled from "styled-components";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { registration } from "../ReduxToolKit/authSlice";
import Layout from "../Components/Layout";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      registration({ name, email, password, phone, address, answer })
    );
    if (result.payload.success) {
      alert(result.payload.message);

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setAnswer("");
      navigate("/login");
    } else {
      alert(result.payload.error);
    }
  };

  return (
    <Layout title={"Registration - TodoAPP"}>
      <Wrapper>
        <div className="main-div">
          <div className="container">
            <div className="inner-div">
              <div className="top-text">
                <h1>Create Account</h1>
              </div>
              <div className="form-div">
                <form className="reg-form">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <br />
                  <div className="email-pass">
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
                  </div>
                  <br />
                  <input
                    type="tel"
                    placeholder="Enter Your Phone no"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                  <br />
                  <div className="personal-detail">
                    <input
                      className="detail-input"
                      type="text"
                      placeholder="Enter Your Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      autoComplete="off"
                    />

                    <input
                      className="ans-input"
                      type="text"
                      placeholder="Enter Your Best Friend Name"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </div>
                  <br />

                  <button
                    type="submit"
                    onClick={handleRegister}
                    className="submit-btn"
                  >
                    Register
                  </button>
                </form>
              </div>
              <div className="login-text">
                <p>
                  Have already an account?{" "}
                  <NavLink to="/login" className="log-link">
                    {" "}
                    Login Here
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = Styled.section`

.main-div{
    width: 100%;
    
}

.container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    background-color: #9ff39f;
    height: 600px;
}

.inner-div{
      position: relative;
      border-radius: 35px;
      z-index: 2; 
      background-color: white;
      padding: 10px 50px;
      width : 50%;
}

.top-text{
   width : 100%;
   display: flex;
   justify-content: center;
}

.top-text h1{
    font-size: 26px;
    padding: 20px 10px;
    font-family: system-ui;
    font-weight: 800;
}

.form-div{
   width : 100%;
}

.reg-form{
    display: flex;
    flex-direction: column;
}

.reg-form input{
    width: 100%;
    padding: 12px;
    outline: none;
}

button{
    width: 100%;
    padding: 12px;
    cursor: pointer;
}

.email-pass{
display: flex;
}

.email-input {
   margin: 0px 5px 0px 0px !important;
}

.detail-input{
   margin: 0px 5px 0px 0px !important;
}

.pass-input{
   margin: 0px 0px 0px 5px !important;
}

.ans-input{
   margin: 0px 0px 0px 5px !important;
}

.personal-detail{
display: flex;
}

.submit-btn{
   font-size : 18px;
   color : white;
   background-color : #13d6d7 ;
   border: 1px solid #13d6d7;
}

.submit-btn:hover{
   font-size : 18px;
   color: #13d6d7 ;
   background-color: white ;
}

.login-text{
   width : 100%;
   display: flex;
   justify-content: center;
}

.login-text p{
    font-size: 15px;
    padding: 20px 10px;
    font-family: system-ui;
}

.log-link{
    font-weight : 600;
    color : black;
    text-decoration : none;
}


`;

export default Registration;
