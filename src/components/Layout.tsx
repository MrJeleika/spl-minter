"use client";

import styled from "styled-components";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.main};
  position: relative;
  padding-bottom: 60px;
`;

export const Layout = ({ children }: Props) => {
  return (
    <StyledWrapper>
      <Navbar />
      {children}
      <Footer />
    </StyledWrapper>
  );
};
