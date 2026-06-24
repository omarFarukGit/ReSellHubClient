import React from "react";
import SellerProfilePage from "./SellerProfilePage";
import { getUserSession } from "@/lib/core/session";

const Profile = async () => {
  const user = await getUserSession();

  console.log(user, "user");
  return (
    <div>
      <SellerProfilePage user={user}/>
    </div>
  );
};

export default Profile;
