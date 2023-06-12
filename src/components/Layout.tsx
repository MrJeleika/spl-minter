import styled from "styled-components";
import { Footer } from "./Footer/Footer";
import { Navbar } from "./Navbar/Navbar";
import { Metadata } from "next";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
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

const StyledWrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.main};
  position: relative;
  padding-bottom: 60px;
`;

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="generator" content={metadata.generator} />
        <meta name="applicationName" content={metadata.applicationName} />
        <meta name="referrer" content={metadata.referrer} />
        <meta name="keywords" content={metadata.keywords.join(",")} />
        <meta name="authors" content={metadata.authors.join(",")} />
        <meta name="creator" content={metadata.creator} />
        <meta name="publisher" content={metadata.publisher} />
      </Head>
      <StyledWrapper>
        <Navbar />
        {children}
        <Footer />
      </StyledWrapper>
    </>
  );
};
