import React, { useState, useContext } from "react";

const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
// Custom Hook
export const useTheme = () => {
    return useContext(ThemeContext);
}

export default ThemeProvider;