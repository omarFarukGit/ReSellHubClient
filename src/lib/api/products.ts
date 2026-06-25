import { serverFetch } from "../core/server";

export const getProducts = async ({
  search,
  category,
  minPrice,
  maxPrice,
}: {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}) => {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};


export const getProductById=async(productId:string)=>{
return serverFetch(`/api/v1/products/${productId}`);
}
