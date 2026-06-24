export type UserRole = "admin" | "buyer" | "seller";

export type UserStatus = "active" | "inactive" | "blocked";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;

  role: UserRole;
  phone: string;
  location: string;
  status: UserStatus;

  createdAt: string;
  updatedAt: string;
}

export interface IUsersResponse {
  success: boolean;
  message: string;
  data: IUser[];
}

export interface IUserResponse {
  success: boolean;
  message: string;
  data: IUser;
}
