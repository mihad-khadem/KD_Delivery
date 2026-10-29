export type Address = {
  _id?: string;
  label: string;
  address: string;
  area: string;
  city: string;
  phone: string;
};

export type AddressInput = {
  label?: string;
  address: string;
  area?: string;
  city?: string;
  phone?: string;
};

export type UserRole = "customer" | "admin" | "rider";

export type UserProfile = {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  role: UserRole;
  addresses: Address[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type UpdateProfileInput = {
  name: string;
  phone: string;
};
