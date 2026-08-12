import { getUserSession } from "@/lib/core/session";
import AdminProfile from "./AdminPorfile";

const Profile = async () => {
  const user = await getUserSession();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminProfile user={user} />
    </div>
  );
};

export default Profile;
