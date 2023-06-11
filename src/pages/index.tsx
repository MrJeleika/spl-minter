"use client";
import { Main } from "@/components/Main/Main";
import { Navbar } from "@/components/Navbar/Navbar";
import { VT323 } from "next/font/google";
import styled from "styled-components";

const vt = VT323({ subsets: ["latin"], weight: "400" });

const StyledMain = styled.main`
  height: 100%;
  background-color: ${(props) => props.theme.main};
`;

const Home = () => {
  return (
    <StyledMain className={vt.className}>
      <Main>asdasd</Main>
    </StyledMain>
  );
};

export default Home;
