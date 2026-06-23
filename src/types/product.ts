export interface SellerInfo {
  userId: string;
  name: string;
  email: string;
  phone: string;
}

export type ProductStatus =
  | "available"
  | "pending"
  | "sold"
  | "rejected";

export interface IProduct {
  _id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  images: string[];
  description: string;
  sellerInfo: SellerInfo;
  status: ProductStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: IProduct[];
}