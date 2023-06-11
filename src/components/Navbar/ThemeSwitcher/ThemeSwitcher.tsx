import { ThemePalmSVG } from "@/components/svg/ThemePalmSVG";
import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setDarkTheme } from "@/redux/slice/appSlice";
import styled, { css, keyframes } from "styled-components";

interface RaysProps {
  $color: string;
}

const rays = (props: RaysProps) => keyframes`
  0% {
    box-shadow:
      0 0 0 0 ${props.$color}80,
      0 0 0 4px ${props.$color}80,
      0 0 0 8px ${props.$color}40,
      0 0 0 12px ${props.$color}20,
      0 0 0 16px ${props.$color}10,
      0 0 8px 20px ${props.$color}10;
  }
  100% {
    box-shadow:
      0 0 0 4px ${props.$color}80,
      0 0 0 8px ${props.$color}40,
      0 0 0 12px ${props.$color}20,
      0 0 0 16px ${props.$color}10,
      0 0 0 20px ${props.$color}00,
      0 0 8px 20px ${props.$color}10;
  }
`;

const planet = styled.div<{ $color: string }>`
  position: relative;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  box-shadow: 0 0 0 4px ${(props) => props.$color}80, 0 0 0 8px ${(props) => props.$color}40,
    0 0 0 12px ${(props) => props.$color}20, 0 0 0 16px ${(props) => props.$color}10,
    0 0 0 20px ${(props) => props.$color}00, 0 0 8px 20px ${(props) => props.$color}10;
  animation: ${(props) =>
      css`
        ${rays(props)}
      `}
    2s infinite linear;
`;

const Sun = styled(planet)``;

const Moon = styled(planet)``;

const Palm = styled(ThemePalmSVG)`
  position: absolute;
`;

export const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const { isDarkTheme } = useAppSelector((state) => state.app);

  const setTheme = (isDarkTheme: boolean) => {
    dispatch(setDarkTheme(isDarkTheme));
  };

  return (
    <>
      {isDarkTheme ? (
        <Moon $color="#e6e6e6" onClick={() => setTheme(false)}>
          <Palm />
        </Moon>
      ) : (
        <Sun $color="#F9CD1A" onClick={() => setTheme(true)}>
          <Palm />
        </Sun>
      )}
    </>
  );
};
