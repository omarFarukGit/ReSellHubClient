import React from "react";
import BuyerProfilePage from "./BuyerPorfilePage";
import { getUserSession } from "@/lib/core/session";

const Profile = async () => {
  const user = await getUserSession();

  console.log(user, "serll");
  return (
    <div>
      <BuyerProfilePage user={user} />
    </div>
  );
};

export default Profile;
