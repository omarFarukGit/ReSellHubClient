export type UserRole = "admin" | "seller" | "buyer";

export type UserStatus = "active" | "blocked";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
  phone: string;
  location: string;
  status: UserStatus;
}
export interface BetterAtuhUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
  phone: string;
  location: string;
  status: UserStatus;
}

export interface IUsersResponse {
  success: boolean;
  message: string;
  data: IUser[];
}

export interface UsersTableProps {
  users: IUser[];
}
