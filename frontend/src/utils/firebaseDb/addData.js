import { doc, setDoc } from "firebase/firestore";
import { db } from "../../constants";
import { toast } from "react-toastify";

const addData = async (uid, data) => {
  const docRef = doc(db, "users", uid);
  try {
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.log(error);
  }
};

export const addCartItems = async (uid, newCartItems) => {
  addData(uid, { cartItems: newCartItems });
  if (newCartItems.length !== 0) {
    toast.info("Added to Cart");
  }
};

export const addWishlistItems = (uid, newWishlist) => {
  addData(uid, { wishlist: newWishlist });
  toast.info("Added to Wishlist");
};

export const addAddresses = (uid, newAddresses) =>
  addData(uid, { addresses: newAddresses });

export const setItemQuantity = async (data, cartItems, type, uid) => {
  let updatedCart;

  const getUpdated = (updatedCount) =>
    cartItems.map((item) =>
      item.id === data.id ? { ...item, count: item.count + updatedCount } : item
    );

  if (type === "increase") {
    updatedCart = getUpdated(+1);
  } else if (type === "decrease") {
    updatedCart =
      data.count > 1
        ? getUpdated(-1)
        : cartItems.filter((item) => item.id !== data.id);
  }

  addData(uid, { cartItems: updatedCart });
};

export const addOrderedItems = async (uid, newOrders) =>
  addData(uid, { orders: newOrders });
