import React from "react";
import BuyerOverviewPage from "./BuyerOverviewPage";
import { getUserSession } from "@/lib/core/session";

const Overview = async () => {
  const user = await getUserSession();
  return (
    <div>
      <BuyerOverviewPage user={user} />
    </div>
  );
};

export default Overview;
