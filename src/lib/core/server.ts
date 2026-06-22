const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path: string) => {
  const res = await fetch(`${baseUrl}${path}`);

  return res.json();
};
