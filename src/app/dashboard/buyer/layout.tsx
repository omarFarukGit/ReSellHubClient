import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const BuyerLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin");
  }
  if (user?.role !== "buyer") {
    return redirect("/forbiden");
  }
  return children;
};

export default BuyerLayout;
