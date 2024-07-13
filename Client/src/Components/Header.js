import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaClipboardList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { logout } from "../ReduxToolKit/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleLogout = () => {
    dispatch(logout());
    alert("Logout Successfully...");
    navigate("/login");
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="main-div">
          <div className="logo-div">
            <NavLink to="/" className="link-logo">
              <h3>Todo App</h3>
              <FaClipboardList className="icons" />
            </NavLink>
          </div>
          <div className="empty-div"></div>
          <div className="nav-div">
            <li>
              <NavLink to="/" className="link">
                Home
              </NavLink>
            </li>
            {!user ? (
              <>
                <li>
                  <NavLink to="/login" className="link">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/registration" className="link">
                    Registration
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="link"> {user.name} </NavLink>
                </li>

                <li onClick={handleLogout}>
                  <NavLink to="/login" className="link">
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    background-color: #c593c5;
  }

  .main-div {
    width: 100%;
    display: flex;
    padding: 20px 15px;
  }

  .logo-div {
    width: 30%;
  }

  .link-logo {
    display: flex;
    text-decoration: none;
  }

  .icons {
    font-size: 30px;
    color: white;
  }

  .logo-div h3 {
    font-size: 25px;
    font-weight: 700;
    color: white;
  }

  .empty-div {
    width: 30%;
  }

  .nav-div {
    width: 40%;
    display: flex;
    justify-content: flex-end;
  }

  li {
    list-style-type: none;
  }

  .link {
    text-decoration: none;
    padding: 10px 15px;
    font-size: 20px;
    color: white;
  }
`;

export default Header;
