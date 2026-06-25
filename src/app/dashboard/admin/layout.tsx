import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin");
  }
  if (user?.role !== "admin") {
    return redirect("/forbiden");
  }
  return children;
};

export default AdminLayout;