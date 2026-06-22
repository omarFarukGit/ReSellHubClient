import { serverFetch } from "../core/server";

export const getProducts = async () => {
  return serverFetch(`/api/v1/products`);
};

export const getProductById=async(productId:string)=>{
return serverFetch(`/api/v1/products/${productId}`);
}
