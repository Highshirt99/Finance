"use client";

import { useState, createContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import { allBudgets } from "@/app/views/budgets/page ";
import { store } from "@/lib/redux/store ";
import { Provider } from "react-redux";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState(1);
  const [minimizeMenu, setMinimizeMenu] = useState(true);
  const [token, setToken] = useState(null);

  const queryClient = new QueryClient();

  const pathname = usePathname();

  // If the route starts with /auth, do not render the global layout
  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    setToken(localStorage.getItem("account"));
  }, []);

  if (isAuthPage) {
    return (
      <html lang="en">
        <body>
          <QueryClientProvider client={queryClient}>
            <AppContext.Provider value={{ token, setToken }}>
              <Provider store={store}>{children}</Provider>
            </AppContext.Provider>
          </QueryClientProvider>
        </body>
      </html>
    ); // Skip global layout and only render the auth content
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          activeMenu,
          setActiveMenu,
          minimizeMenu,
          setMinimizeMenu,
        }}
      >
        <Provider store={store}>
          <Sidebar />
          {children}
          <MobileSidebar />
        </Provider>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}
