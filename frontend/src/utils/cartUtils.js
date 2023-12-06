const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
export default addDecimals;

export const updateCart = (state) => {
  //CalculateItemPrice
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //CalculateShippingPrice(>100$ goes free or 10$)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  //CalculateTaxPrice(15%)
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));
  //CalculateTotalPrice
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  localStorage.setItem("cart", JSON.stringify(state));
  return state
};
