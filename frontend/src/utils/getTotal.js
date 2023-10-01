import getSellingPrice from "./getSellingPrice";

//get total products
export const getTotalItems = (cartItems) => {
  let total = 0;
  for (let item of cartItems) {
    total += item.count;
  }
  return total;
};

export const getTotalPrice = (cartItems) => {
  let total = 0;
  for (let item of cartItems) {
    total += item.amount * item.count;
  }
  return total;
};

export const getTotalDiscountPrice = (cartItems) => {
  let total = 0;
  for (let item of cartItems) {
    total += item.amount * (item.discount / 100) * item.count;
  }
  return total;
};

export const getTotalAmount = (cartItems) => {
  let total = 0;
  for (let item of cartItems) {
    total += getSellingPrice(item.amount, item.discount) * item.count;
  }
  return total;
};
