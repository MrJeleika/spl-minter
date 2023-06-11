import { useAppDispatch, useAppSelector } from "@/redux/app/hooks";
import { setDarkTheme } from "@/redux/slice/appSlice";
import { useEffect, useState } from "react";

export const useThemeDetector = () => {
  const dispatch = useAppDispatch()
  const [isDarkThemeState, setIsDarkTheme] = useState<boolean>(false);  
  useEffect(() => {
  const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
  setIsDarkTheme(getCurrentTheme())
  const mqListener = ((e:any) => {
      setIsDarkTheme(e.matches);
  });
  

    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  const { isDarkTheme } = useAppSelector((state) => state.app);

  useEffect(() => {
    dispatch(setDarkTheme(isDarkThemeState));
  }, []);

  return isDarkTheme;
}