import { Main } from "@/components/Main/Main";
import { Navbar } from "@/components/Navbar/Navbar";
import { Metadata } from "next";
import { VT323 } from "next/font/google";
import styled from "styled-components";

const vt = VT323({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Token minter",
  description: "Spl token minter on Solana blockchain",
  generator: "Next.js",
  applicationName: "Token minter",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Solana token",
    "Token",
    "Solana",
    "spl token",
    "spl",
    "mint token",
    "mint solana token",
    "mint spl",
    "spl mint",
  ],
  authors: [
    { name: "MrJeleika", url: "https://github.com/MrJeleika" },
    { name: "Paradise ", url: "https://discord.gg/Wn2EqX9r5Y" },
  ],
  creator: "Paradise DAO",
  publisher: "Paradise DAO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

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
