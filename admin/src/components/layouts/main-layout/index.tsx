"use client";
import { useState } from "react";
import Header from "../../organisms/header";
import SideBar from "../../organisms/sideBar";

const MainLayout = ({ main }: { main: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <div className="flex min-h-screen overflow-hidden">
        <SideBar sidebarOpen={sidebarOpen} />

        <main className="flex-1 flex flex-col ml-64 overflow-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div className="p-6 mt-16 max-w-full overflow-x-auto">{main}</div>
        </main>
      </div>
    </>
  );
};
export default MainLayout;
