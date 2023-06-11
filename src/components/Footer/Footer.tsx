import styled from "styled-components";
import { DiscordSVG } from "../svg/Discord";
import Link from "next/link";

const StyledFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => props.theme.main};
  padding: 50px 30px 20px 30px;
`;
const FooterBody = styled.div`
  max-width: 1100px;
  color: ${(props) => props.theme.secondary};
  font-family: "__VT323_ce45b0", "__VT323_Fallback_ce45b0";
  font-size: 24px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledH1 = styled.h1`
  font-size: 24px;
`;

export const Footer = () => {
  return (
    <StyledFooter>
      <FooterBody>
        <StyledH1>Paradise 2023</StyledH1>
        <Link href="https://discord.gg/Wn2EqX9r5Y" target="_blank">
          <DiscordSVG isFooter width={50} height={50} />
        </Link>
      </FooterBody>
    </StyledFooter>
  );
};
