"use client";
import { useThemeDetector } from "@/hooks/useThemeDetector";
import { dark, light } from "@/theme/theme";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

interface Props {
  children: ReactNode;
}

export const ThemeChangeProvider = ({ children }: Props) => {
  const theme = useThemeDetector();
  return <ThemeProvider theme={theme ? dark : light}>{children}</ThemeProvider>;
};
