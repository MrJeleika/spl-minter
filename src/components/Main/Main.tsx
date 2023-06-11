import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import styled from "styled-components";
import { TokenForm } from "../TokenForm/TokenForm";

const StyledBody = styled.div`
  height: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 10px 20px;
`;

const NoWallet = styled.div`
  width: 100%;
  margin-top: 200px;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  display: flex;
  color: ${(props) => props.theme.secondary};
`;

interface Props {
  children: React.ReactNode;
}

export const Main = ({ children }: Props) => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return (
    <StyledBody>
      {!publicKey || !connection ? <NoWallet>Connect wallet first</NoWallet> : <TokenForm />}
    </StyledBody>
  );
};
