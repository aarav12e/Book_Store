import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "light");
  const [colorOption, setColorOption] = useState(localStorage.getItem("themeColor") || "pink");

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
    localStorage.setItem("themeColor", colorOption);

    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark");
    }
  }, [mode, colorOption]);

  const getPrimaryColor = () => {
    switch (colorOption) {
      case "ocean": return "#0ea5e9";
      case "forest": return "#10b981";
      case "sunset": return "#f97316";
      default: return "#ec4899"; // pink
    }
  };

  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: mode === "dark" ? "dark" : "light",
      primary: { main: getPrimaryColor() },
      background: {
        default: mode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            backgroundColor: mode === "dark" ? "rgba(30, 41, 59, 0.9)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
          }
        }
      }
    }
  }), [mode, colorOption]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, colorOption, setColorOption }}>
      <MUIThemeProvider theme={muiTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);
