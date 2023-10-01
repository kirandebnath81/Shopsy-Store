import { doc, setDoc } from "firebase/firestore";
import { db } from "../../constants";
import { toast } from "react-toastify";

const deletedata = async (uid, data) => {
  const docRef = doc(db, "users", uid);
  try {
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWishlistItem = (uid, wishlist, deleteItem) => {
  const updatedWishlist = wishlist.filter(({ id }) => id !== deleteItem.id);
  const data = { wishlist: updatedWishlist };
  deletedata(uid, data);
  toast.info("Removed from Wishlist");
};

export const deleteCartItem = (uid, cartItems, deleteItem) => {
  const updatedCart = cartItems.filter(({ id }) => id !== deleteItem.id);
  const data = { cartItems: updatedCart };
  deletedata(uid, data);
};

export const deleteAddress = (uid, addresses, deleteAddress) => {
  const updatedAddresses = addresses.filter(
    ({ id }) => id !== deleteAddress.id
  );
  const data = { addresses: updatedAddresses };
  deletedata(uid, data);
};
