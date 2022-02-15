import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
// import img from '.././public/img1.jpg'

const HeaderComponent = () => {
  return (
    <div>
      <Container>
        <Wrapper>
          <Logo src="/img2.png" />

          <Navs>
            <Link href="/">
              <Nav>Home</Nav>
            </Link>
            <Link href="/create">
              <Nav>Create</Nav>
            </Link>
          </Navs>
          <Logout>Logout</Logout>
        </Wrapper>
      </Container>
    </div>
  );
};

export default HeaderComponent;

const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: crimson;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.img`
  width: 70px;
  height: 40px;
  margin-left: 30px;
  object-fit: cover;
  border-radius: 4px;
`;
const Navs = styled.div`
  display: flex;
`;
const Nav = styled.a`
  padding: 8px 15px;
  margin: 0px 5px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  :hover {
    background-color: rgb(70, 70, 70);
    cursor: pointer;
  }
`;
const Logout = styled.button`
  width: 90px;
  height: 40px;
  margin-right: 30px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  background-color: rgb(70, 70, 70);
  color: white;
  cursor: pointer;
`;
