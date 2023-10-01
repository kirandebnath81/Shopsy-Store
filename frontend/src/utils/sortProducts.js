import getSellingPrice from "./getSellingPrice";

const sortProducts = (data, sortValue) => {
  const sortData = data.slice(0);

  if (sortValue === "ascending") {
    return sortData.sort(
      (a, b) =>
        getSellingPrice(a.amount, a.discount) -
        getSellingPrice(b.amount, b.discount)
    );
  } else if (sortValue === "descending") {
    return sortData.sort(
      (a, b) =>
        getSellingPrice(b.amount, b.discount) -
        getSellingPrice(a.amount, a.discount)
    );
  } else {
    return data;
  }
};

export default sortProducts;
