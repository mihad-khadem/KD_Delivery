import type { ServingKey } from "./order";

export type MenuPrices = Record<ServingKey, number>;

export type MenuItem = {
  id: number;
  name: string;
  slug: string;
  category: string;
  prices: MenuPrices;
  image: string;
  description: string;
};

export type CartItem = {
  cartKey: string;
  menuItemId: number;
  name: string;
  slug: string;
  image: string;
  servingSize: ServingKey;
  unitPrice: number;
  quantity: number;
};
