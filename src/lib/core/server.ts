import { getUserToken } from "./session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path: string) => {
  const res = await fetch(`${baseUrl}${path}`);

  return res.json();
};

export const authHeader = async () => {
  const token = await getUserToken();
  const header = {
    authorization: `Bearer ${token}`,
  };

  return token ? header : {};
};
