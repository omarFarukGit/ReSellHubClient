export interface Product {
  _id: string;
  title: string;
  category: string;
  condition: string;
  price: number;
  images: string[];
  description: string;
  status: "available" | "sold";
}