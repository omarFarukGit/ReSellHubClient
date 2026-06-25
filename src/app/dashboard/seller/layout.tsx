import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const SellerLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin");
  }
  if (user?.role !== "seller") {
    return redirect("/forbiden");
  }
  return children;
};

export default SellerLayout;
