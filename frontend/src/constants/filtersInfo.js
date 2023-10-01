const filtersInfo = [
  {
    title: "CATEGORIES",
    type: "category",
    inputList: [
      { name: "pants", id: "pants", label: "Pants" },
      { name: "hoodie", id: "hoodie", label: "Hoodie" },
      { name: "t_shirt", id: "t_shirt", label: "T-Shirt" },
      { name: "outfit", id: "outfit", label: "Outfit" },
    ],
    id: 1,
  },
  {
    title: "SIZE",
    type: "size",
    inputList: [
      { name: "s", id: "small", label: "S" },
      { name: "m", id: "medium", label: "M" },
      { name: "l", id: "large", label: "L" },
      { name: "xl", id: "extraLarge", label: "XL" },
    ],
    id: 2,
  },
  {
    title: "BRAND",
    type: "brand",
    inputList: [
      {
        name: "american eagle",
        id: "americanEagle",
        label: "American Eagle",
      },
      { name: "hollister", id: "hollister", label: "Hollister" },
      { name: "zara", id: "zara", label: "Zara" },
      { name: "h&m", id: "h&m", label: "H&M" },
    ],
    id: 3,
  },
  {
    title: "GENDER",
    type: "gender",
    inputList: [
      { name: "men", id: "men", label: "Men" },
      { name: "women", id: "women", label: "Women" },
      { name: "babyboys", id: "babyboys", label: "Baby Boys" },
      { name: "babygirls", id: "babygirls", label: "Baby Girls" },
    ],
    id: 4,
  },
  {
    title: "OTHERS",
    type: "others",
    inputList: [
      { name: "fastDelivery", id: "delivery", label: "Fast Delivery" },
      {
        name: "excludeOutOfStock",
        id: "stock",
        label: "Exclude out of stock",
      },
    ],
    id: 5,
  },
];

export default filtersInfo;
