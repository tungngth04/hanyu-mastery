"use client";
import { useState } from "react";
import Header from "../../organisms/header";
import SideBar from "../../organisms/sideBar";

const MainLayout = ({ main }: { main: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <div className="flex min-h-screen">
        <SideBar sidebarOpen={sidebarOpen} />
        <main className="flex-1 flex flex-col min-w-0">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="p-6 slide-up delay-100 w-full overflow-hidden">
            {main}
          </div>
        </main>
      </div>
    </>
  );
};
export default MainLayout;
