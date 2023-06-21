import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styled from "styled-components";
import { Logo } from "../svg/Logo";
import { DiscordSVG } from "../svg/Discord";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher/ThemeSwitcher";

export const Navbar = () => {
  const StyledWalletMultiButton = styled(WalletMultiButton)`
    box-shadow: ${(props) =>
      "-3px 0 0 0 " +
      props.theme.secondary +
      ", 3px 0 0 0 " +
      props.theme.secondary +
      ", 0 -3px 0 0 " +
      props.theme.secondary +
      ", 0 3px 0 0 " +
      props.theme.secondary};
    border: 0;
    border-radius: 0;
    color: ${(props) => props.theme.secondary};
    background-color: ${(props) => props.theme.main};
    font-family: "__VT323_ce45b0", "__VT323_Fallback_ce45b0";
    letter-spacing: 2px;
    font-size: 20px;
    &:hover {
      background-color: transparent;
    }
    &:not([disabled]):hover {
      background-color: ${(props) => props.theme.main};
    }
    & ~ ul {
      font-family: "__VT323_ce45b0", "__VT323_Fallback_ce45b0";
      background: ${(props) => props.theme.main};
      & > li {
        font-size: 20px;
        color: ${(props) => props.theme.secondary};
        &:not([disabled]):hover {
          background: ${(props) => props.theme.main};
        }
      }
    }
  `;

  const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.main};
    padding: 10px 30px;
    width: 100%;

    @media (max-width: 768px) {
      padding: 10px 10px 10px 14px;
    }
  `;

  const Flex = styled.div`
    display: flex;
    align-items: center;
  `;

  const StyledTitle = styled.h1`
    color: ${(props) => props.theme.nav};
    text-transform: uppercase;
    font-size: 60px;
    line-height: 1;
    font-family: "__VT323_ce45b0", "__VT323_Fallback_ce45b0";
    letter-spacing: 3px;
    margin-left: 10px;
    @media (max-width: 768px) {
      display: none;
    }
  `;
  const ButtonsFlex = styled(Flex)`
    & > * {
      margin: 0 10px;
    }
    & a {
      display: flex;
      align-self: flex-end;
      @media (max-width: 768px) {
        display: none;
      }
    }
    & button {
      margin-right: 0;
    }
  `;

  return (
    <StyledNav>
      <Flex>
        <Logo />
        <StyledTitle>Paradise</StyledTitle>
      </Flex>
      <ButtonsFlex>
        <ThemeSwitcher />
        <Link href="https://discord.gg/Wn2EqX9r5Y" target="_blank">
          <DiscordSVG width={60} height={55} />
        </Link>
        <StyledWalletMultiButton />
      </ButtonsFlex>
    </StyledNav>
  );
};
