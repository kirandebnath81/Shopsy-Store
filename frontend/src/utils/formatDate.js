export const formatDeliveryDate = (daysToAdd, orderDate = null) => {
  let futureDate = orderDate ? new Date(orderDate) : new Date();

  futureDate.setDate(futureDate.getDate() + daysToAdd);

  if (orderDate) {
    return futureDate;
  } else {
    return futureDate.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }
};

export const formatOrderDate = () => {
  const date = new Date();
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
