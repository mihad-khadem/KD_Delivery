
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ServingKey = "one" | "three" | "five";

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

type AddToCartPayload = Omit<CartItem, "cartKey" | "quantity">;

type UpdateQuantityPayload = {
  cartKey: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const item = action.payload;

      // The same dish with different serving sizes gets a separate cart entry.
      const cartKey = `${item.menuItemId}-${item.servingSize}`;

      const existingItem = state.items.find(
        (cartItem) => cartItem.cartKey === cartKey
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...item,
          cartKey,
          quantity: 1,
        });
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<UpdateQuantityPayload>
    ) => {
      const { cartKey, quantity } = action.payload;

      const item = state.items.find(
        (cartItem) => cartItem.cartKey === cartKey
      );

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => cartItem.cartKey !== cartKey
        );
      } else {
        item.quantity = quantity;
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.cartKey !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.items;

export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

export default cartSlice.reducer;
