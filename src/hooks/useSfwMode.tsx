import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface SfwContextType {
  sfwMode: boolean;
  toggleSfw: () => void;
}

const SfwContext = createContext<SfwContextType>({ sfwMode: false, toggleSfw: () => {} });

export const SfwProvider = ({ children }: { children: ReactNode }) => {
  const [sfwMode, setSfwMode] = useState(() => {
    return localStorage.getItem("sv_sfw_mode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sv_sfw_mode", String(sfwMode));
  }, [sfwMode]);

  const toggleSfw = () => setSfwMode((prev) => !prev);

  return (
    <SfwContext.Provider value={{ sfwMode, toggleSfw }}>
      {children}
    </SfwContext.Provider>
  );
};

export const useSfwMode = () => useContext(SfwContext);
