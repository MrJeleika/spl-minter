import styled, { css } from "styled-components";
import "animate.css";
import { MintingStatus } from "@/redux/slice/appSlice";

const StyledLoading = styled.div<StyledProps>`
  padding: 8px 16px;
  position: absolute;
  top: 80%;
  left: 20px;
  z-index: 999;
  ${(props) => {
    switch (props.$status) {
      case "minting":
        return css`
          box-shadow: ${(props) =>
            "-3px 0 0 0 " +
            props.theme.secondary +
            ", 3px 0 0 0 " +
            props.theme.secondary +
            ", 0 -3px 0 0 " +
            props.theme.secondary +
            ", 0 3px 0 0 " +
            props.theme.secondary};
        `;
      case "error":
        return css`
          box-shadow: -3px 0 0 0 #d32f2f, 3px 0 0 0 #d32f2f, 0 -3px 0 0 #d32f2f, 0 3px 0 0 #d32f2f;
        `;
      case "success":
        return css`
          box-shadow: -3px 0 0 0 #388e3c, 3px 0 0 0 #388e3c, 0 -3px 0 0 #388e3c, 0 3px 0 0 #388e3c;
        `;
    }
  }}
`;

interface StyledProps {
  $status: MintingStatus;
}

interface Props extends StyledProps {}

const H1 = styled.h1`
  font-size: 32px;
  font-family: "__VT323_ce45b0", "__VT323_Fallback_ce45b0";
`;

const StyledH1 = styled(H1)<StyledProps>`
  ${(props) => {
    switch (props.$status) {
      case "minting":
        return css`
          color: ${props.theme.secondary};
        `;
      case "error":
        return css`
          color: #d32f2f;
        `;
      case "success":
        return css`
          color: #388e3c;
        `;
    }
  }}
`;

export const Loading = ({ $status }: Props) => {
  return (
    <>
      {$status === "none" ? null : $status === "minting" ? (
        <StyledLoading $status={$status} className="animate__animated animate__bounceInLeft">
          <StyledH1 $status={$status}>Minting...</StyledH1>
        </StyledLoading>
      ) : null}

      {$status === "error" ? (
        <StyledLoading $status={$status} className="animate__animated animate__bounceInLeft">
          <StyledH1 $status={$status}>Error. Try again...</StyledH1>
        </StyledLoading>
      ) : null}

      {$status === "success" ? (
        <StyledLoading $status={$status} className="animate__animated animate__bounceInLeft">
          <StyledH1 $status={$status}>Successfully minted!</StyledH1>
        </StyledLoading>
      ) : null}
    </>
  );
};
