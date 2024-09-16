import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        // state.cartItems = state.cartItems.map((x) =>
        // x._id === existItem._id ? item : x
        // );
        state.cartItems = state.cartItems.map((x) => {
          if (x._id === existItem._id) {
            return item;
          } else {
            return x;
          }
        });
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate Item Price
      state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate Shipping Price (If order is over $100 then free shipping or else $10)
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

      // Calculate Tax Price
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

      // Calculate Total Price
      state.totalPrice = (
        Number(state.itemPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
