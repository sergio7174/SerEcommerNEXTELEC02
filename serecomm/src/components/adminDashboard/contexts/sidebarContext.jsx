import { ReactNode, useState, createContext } from "react";
export const SidebarContext = createContext({});

function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  return <SidebarContext.Provider value={{ collapsed, setCollapsed }}>{children}</SidebarContext.Provider>;
}

export default SidebarProvider;
