import { doc, setDoc } from "firebase/firestore";
import { db } from "../../constants";

const editAddress = async (uid, addresses, editedAddress) => {
  const updatedAddress = addresses.map((address) =>
    address.id === editedAddress.id ? editedAddress : address
  );
  const docRef = doc(db, "users", uid);

  try {
    await setDoc(docRef, { addresses: updatedAddress }, { merge: true });
  } catch (error) {
    console.log(error);
  }
};

export default editAddress;
