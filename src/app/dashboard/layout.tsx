
import DashBoardSideBar from "@/components/dashboard/DashBoardSideBar";
import React from "react";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <DashBoardSideBar />
      <div className=" flex-1">{children}</div>
    </div>
  );
};

export default DashBoardLayout;