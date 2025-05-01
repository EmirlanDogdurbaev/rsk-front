import React from "react";
import Header from "../widgets/header/Header";
import { Sidebar } from "../widgets/sidebar/ui/Sidebar";
import bg from "../shared/assets/bg.png";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div
        className="flex flex-1 overflow-hidden"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: "1",
        }}
      >
        <aside className="flex-shrink-0">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-auto p-2">
          <Outlet />
          {children}
        </main>
      </div>
    </div>
  );
};
