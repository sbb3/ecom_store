import { createSlice } from "@reduxjs/toolkit";

const _items =
  localStorage.getItem("cartItems") != null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
const _totalAmount =
  localStorage.getItem("totalAmount") != null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: _items,
    total: _totalAmount,
  },
  reducers: {
    addToCart: (state, action) => {
      const { slug, price } = action.payload;
      const item = state.items.find((prod) => prod.slug === slug);
      if (!item) {
        state.items.push(action.payload);
        const totalPrice = parseFloat((state.total + price).toFixed(2));
        state.total = totalPrice;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalAmount", JSON.stringify(state.total));
    },
    removeFromCart: (state, action) => {
      const { slug, price } = action.payload;

      state.items = state.items.filter((prod) => prod.slug !== slug);
      const totalPrice = parseFloat((state.total - price).toFixed(2));
      state.total = totalPrice;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalAmount", JSON.stringify(state.total));
    },
    clearCart: (state, action) => {
      state.items = [];
      state.total = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalAmount", JSON.stringify(state.total));
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
