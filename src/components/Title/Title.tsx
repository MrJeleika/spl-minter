import styled from "styled-components";

export const StyledTitle = styled.h1<{ $margin?: string }>`
  font-family: "__VT323_ce45b0", "__VT323_Fallback_ce45b0";
  color: ${(props) => props.theme.secondary};
  font-size: 24px;
  letter-spacing: 0.5px;
  margin: ${(props) => (props.$margin ? props.$margin : "0px 0px 10px 0px")};
`;

export const FormTitle = styled(StyledTitle)`
  font-size: 36px;
  text-align: center;
`;
