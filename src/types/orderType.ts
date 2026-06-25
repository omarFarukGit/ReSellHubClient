export type PaymentStatus = "paid" | "unpaid";

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

export interface IUserInfo {
  userId: string;
  name: string;
  email: string;
  address?: string;
}

export interface IOrder {
  _id: string;

  buyerInfo: IUserInfo;
  sellerInfo: IUserInfo;

  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;

  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;

  createdAt: string;
  updatedAt: string;

  __v: number;
}

export interface IOrdersResponse {
  success: boolean;
  message: string;
  data: IOrder[];
}

export interface OrdersTableProps {
  orders: IOrder[];
}
