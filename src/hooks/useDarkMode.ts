import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const useDarkMode = (): [Theme, (theme: Theme) => void] => {
  const [theme, setTheme] = useState<Theme>((localStorage.getItem("theme") as Theme) ?? "light");
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};

export default useDarkMode;
