import styled from "styled-components";

export const StyledButton = styled.button`
  box-shadow: ${(props) =>
    "-3px 0 0 0 " +
    props.theme.accents +
    ", 3px 0 0 0 " +
    props.theme.accents +
    ", 0 -3px 0 0 " +
    props.theme.accents +
    ", 0 3px 0 0 " +
    props.theme.accents};
  background: ${(props) => props.theme.color_main};
  font-family: "__VT323_ce45b0", "__VT323_Fallback_ce45b0";
  color: white;
  margin: 10px;
  padding: 8px 16px;
  border-color: ${(props) => props.theme.color_main};
  border-width: 3px;
  font-size: 25px;
  cursor: pointer;
`;
