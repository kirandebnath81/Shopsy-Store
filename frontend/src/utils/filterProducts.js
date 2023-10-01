//filter by product ratings
const filterByRatings = (data, ratingFilter) =>
  data.filter(({ ratings }) => ratings >= ratingFilter);

//filter by product category
const filterByCategory = (data, categoryFilters) => {
  if (categoryFilters.length === 0) return data;

  return data.filter(({ category }) => categoryFilters.includes(category));
};

//filter by product size
const filterBySize = (data, sizeFilters) => {
  if (sizeFilters.length === 0) return data;

  return data.filter(({ sizes }) =>
    sizes.some((size) => sizeFilters.includes(size.toLowerCase()))
  );
};

//filter by product brand
const filterByBrand = (data, brandFilters) => {
  if (brandFilters.length === 0) return data;

  return data.filter(({ brand }) => brandFilters.includes(brand.toLowerCase()));
};

//filter by product gender
const filterByGender = (data, genderFilters) => {
  if (genderFilters.length === 0) return data;

  return data.filter(({ gender }) => genderFilters.includes(gender));
};

// filter by fast delivery and out of stock
const filterByOthers = (data, otherFilters) => {
  if (otherFilters.length === 0) return data;
  const fastDelivery = otherFilters.includes("fastDelivery");
  const excludeOutOfStock = otherFilters.includes("excludeOutOfStock");

  if (fastDelivery && !excludeOutOfStock) {
    return data.filter(({ deliveryDays }) => deliveryDays === 1);
  } else if (excludeOutOfStock && !fastDelivery) {
    return data.filter(({ stock }) => stock !== 0);
  } else if (fastDelivery && excludeOutOfStock) {
    return data.filter(
      ({ deliveryDays, stock }) => deliveryDays === 1 && stock !== 0
    );
  }
};

//Main filter function
export const filterProducts = (data, filters) => {
  const {
    categoryFilters,
    sizeFilters,
    brandFilters,
    genderFilters,
    otherFilters,
    ratingFilter,
  } = filters;

  //Each time products are rendered it goes throgh through three filtering stages. One stage's filtered data is used as a filterable data for the next stage. In this way the main data gets filtered by all the given filters.

  const ratingfilteredProducts = filterByRatings(data, ratingFilter);

  const categoryfilteredProducts = filterByCategory(
    ratingfilteredProducts,
    categoryFilters
  );

  const sizesfilteredProducts = filterBySize(
    categoryfilteredProducts,
    sizeFilters
  );

  const brandsfilteredProducts = filterByBrand(
    sizesfilteredProducts,
    brandFilters
  );

  const gendersfilteredProducts = filterByGender(
    brandsfilteredProducts,
    genderFilters
  );

  const othersfilteredProducts = filterByOthers(
    gendersfilteredProducts,
    otherFilters
  );

  return othersfilteredProducts;
};
