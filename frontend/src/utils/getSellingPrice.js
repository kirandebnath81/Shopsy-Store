//get final amount after deducting discount
const getSellingPrice = (amount, discount) =>
  Math.ceil(amount - amount * (discount / 100));

export default getSellingPrice;
