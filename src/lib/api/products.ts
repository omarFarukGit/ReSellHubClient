import { serverFetch } from "../core/server";

export const getProducts = async ({
  search,
  category,
  minPrice,
  maxPrice,
  page = 1,
}: {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: number;
}) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  params.append("page", String(page));
  params.append("limit", "8");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?${params.toString()}`,
    {
      cache: "no-store",
    },
  );

  return res.json();
};

export const getProductById = async (productId: string) => {
  return serverFetch(`/api/v1/products/${productId}`);
};
