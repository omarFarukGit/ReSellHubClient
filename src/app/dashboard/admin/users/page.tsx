import React from "react";
import AdminUsersPage from "./UsersPage";

const page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users`);
  const data = await res.json();
  const users = data.data;
  console.log(users);
  return (
    <div>
      <AdminUsersPage users={users} />
    </div>
  );
};

export default page;
