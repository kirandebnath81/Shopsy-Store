export { getRatingIconInfo } from "./getRatingIcon";
export { filterProducts } from "./filterProducts";

export {
  addCartItems,
  addWishlistItems,
  setItemQuantity,
  addAddresses,
  addOrderedItems,
} from "./firebaseDb/addData";

export {
  deleteWishlistItem,
  deleteCartItem,
  deleteAddress,
} from "./firebaseDb/deleteData";

export {
  fetchUserDetails,
  fetchProducts,
  fetchProduct,
  fetchBestSellProducts,
  fetchSearchedProduct,
  fetchSimilarProduct,
} from "./firebaseDb/fetchData";

export { formatDeliveryDate, formatOrderDate } from "./formatDate";

export { default as getSellingPrice } from "./getSellingPrice";

export { getTotalItems, getTotalPrice, getTotalAmount } from "./getTotal";

export { default as editAddress } from "./firebaseDb/editAddress";
export { default as loadRazorpayScript } from "./loadRazorpayScript";
export { default as sortProducts } from "./sortProducts";
