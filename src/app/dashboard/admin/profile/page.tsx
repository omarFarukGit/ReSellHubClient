import React from "react";

import { getUserSession } from "@/lib/core/session";
import AdminProfile from "./AdminPorfile";

const Profile = async () => {
  const user = await getUserSession();
  return (
    <div>
      <AdminProfile user={user}/>
    </div>
  );
};

export default Profile;