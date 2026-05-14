import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material";

export const ThemeContext = createContext();

const THEMES = {
  pink: {
    primary: "#ec4899",
    secondary: "#8b5cf6",
    gradient: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    gradientFrom: "#ec4899",
    gradientTo: "#8b5cf6",
    name: "🌸 Pink",
  },
  ocean: {
    primary: "#0ea5e9",
    secondary: "#06b6d4",
    gradient: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
    gradientFrom: "#0ea5e9",
    gradientTo: "#06b6d4",
    name: "🌊 Ocean",
  },
  forest: {
    primary: "#10b981",
    secondary: "#059669",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    gradientFrom: "#10b981",
    gradientTo: "#059669",
    name: "🌿 Forest",
  },
  sunset: {
    primary: "#f97316",
    secondary: "#ef4444",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    gradientFrom: "#f97316",
    gradientTo: "#ef4444",
    name: "🌅 Sunset",
  },
};

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "light");
  const [colorOption, setColorOption] = useState(localStorage.getItem("themeColor") || "pink");

  useEffect(() => {
    const theme = THEMES[colorOption] || THEMES.pink;
    const root = document.documentElement;

    // Persist settings
    localStorage.setItem("themeMode", mode);
    localStorage.setItem("themeColor", colorOption);

    // Apply dark/light mode class
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Inject CSS custom properties so ALL components pick up the theme
    root.style.setProperty("--color-primary", theme.primary);
    root.style.setProperty("--color-secondary", theme.secondary);
    root.style.setProperty("--gradient-from", theme.gradientFrom);
    root.style.setProperty("--gradient-to", theme.gradientTo);
    root.style.setProperty("--theme-gradient", theme.gradient);
  }, [mode, colorOption]);

  const muiTheme = useMemo(() => {
    const theme = THEMES[colorOption] || THEMES.pink;
    return createTheme({
      palette: {
        mode: mode === "dark" ? "dark" : "light",
        primary: { main: theme.primary },
        secondary: { main: theme.secondary },
        background: {
          default: mode === "dark" ? "#0f172a" : "#f8fafc",
          paper: mode === "dark" ? "#1e293b" : "#ffffff",
        },
      },
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundImage: "none",
              backgroundColor: mode === "dark" ? "rgba(30, 41, 59, 0.95)" : "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              "&:hover": { backgroundColor: mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)" },
            },
          },
        },
      },
    });
  }, [mode, colorOption]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, colorOption, setColorOption, themes: THEMES }}>
      <MUIThemeProvider theme={muiTheme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext);
