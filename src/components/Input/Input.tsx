import styled from "styled-components";

export const StyledInput = styled.input<{ $margin?: string; $width?: string; $error?: boolean }>`
  box-shadow: ${(props) =>
    props.$error
      ? "-3px 0 0 0 " +
        props.theme.error +
        ", 3px 0 0 0 " +
        props.theme.error +
        ", 0 -3px 0 0 " +
        props.theme.error +
        ", 0 3px 0 0 " +
        props.theme.error
      : "-3px 0 0 0 " +
        props.theme.secondary +
        ", 3px 0 0 0 " +
        props.theme.secondary +
        ", 0 -3px 0 0 " +
        props.theme.secondary +
        ", 0 3px 0 0 " +
        props.theme.secondary};
  color: ${(props) => props.theme.secondary} !important;
  outline: none;
  padding: 8px;
  font-size: 25px;
  background-color: transparent;
  border: none;
  width: ${(props) => (props.$width ? props.$width : "100%")};
  margin: ${(props) => (props.$margin ? props.$margin : "0px 0px 20px 0px")};
  font-family: "__VT323_ce45b0", "__VT323_Fallback_ce45b0";
  &:-webkit-autofill {
    -webkit-text-fill-color: ${(props) => props.theme.secondary} !important;
  }
  &:focus {
    outline: none;
    color: ${(props) => props.theme.secondary} !important;
    background: transparent;
  }
`;
