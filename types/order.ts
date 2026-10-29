export type ServingKey = "one" | "three" | "five";

export type OrderType = "delivery" | "pickup";

export type PaymentMethod = "cash_on_delivery" | "online";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  cartKey: string;
  menuItemId: number;
  product?: string | null;
  name: string;
  slug: string;
  image: string;
  servingSize: ServingKey;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type Order = {
  _id: string;
  orderNumber: string;
  customer: string | null;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  orderType: OrderType;
  deliveryAddress: string;
  deliveryArea: string;
  deliveryZone: string | null;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  rider: string | null;
  notes: string;
  confirmedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateOrderInput = {
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  orderType: OrderType;
  deliveryAddress?: string;
  deliveryArea?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
};

export type OrdersApiResponse = {
  orders: Order[];
};

export type ApiErrorResponse = {
  message: string;
};
