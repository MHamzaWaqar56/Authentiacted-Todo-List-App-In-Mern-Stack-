import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <h4>All Rights Reserved &copy; Todo App</h4>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h4 {
    padding: 30px 0px;
    background-color: #c593c5;
    font-size: 25px;
    color: white;
    text-align: center;
  }
`;

export default Footer;
