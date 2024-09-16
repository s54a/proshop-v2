export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
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
  return state;
};
