import { useContext } from "react";

import PropTypes from "prop-types";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../constants";

import { ModalContext, UserContext } from "../../contexts";
import { deleteAddress } from "../../utils";
import { useAuthState } from "react-firebase-hooks/auth";

const AddressCard = ({ address }) => {
  const { setIsCreateAddressModal } = useContext(ModalContext);
  const [user] = useAuthState(auth);
  const { userDetails, setUserDetails } = useContext(UserContext);

  const { addresses, selectedAddressId } = userDetails;

  const changeHandler = async (e) => {
    const addressId = e.target.value;
    const docRef = doc(db, "users", user?.uid);
    try {
      await setDoc(docRef, { selectedAddressId: addressId }, { merge: true });
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (address) => {
    setUserDetails((prev) => ({ ...prev, editedAddress: address }));
    setIsCreateAddressModal(true);
  };
  return (
    <div
      key={address.id}
      className="px-3 py-5 ss:p-5 rounded-lg shadow-light hover:scale-[1.03] hover:shadow-secondary transition-all duration-500"
    >
      <div className="flex items-start gap-x-4">
        <input
          type="radio"
          name="address"
          value={address.id}
          checked={address.id === selectedAddressId}
          onChange={changeHandler}
          id={address.id}
          className="cursor-pointer w-4 h-4"
        />
        <label
          htmlFor={address.id}
          className="cursor-pointer text-sm ss:text-base"
        >
          <div className="font-medium">{address.fullName}</div>
          <div>{address.area}</div>
          <div>
            {address.city}, {address.state}, {address.country},{" "}
            {address.pincode}
          </div>
          <div>Phone No : {address.mobileNo}</div>
        </label>
      </div>

      <div className="mt-4 space-x-4 ml-[30px] ss:ml-8">
        <button
          className="px-4 py-1 text-[11px] ss:text-[13px] font-medium rounded-[4px] text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-500 transition-colors duration-300"
          onClick={() => editHandler(address)}
        >
          Edit
        </button>
        <button
          className="px-4 py-1 text-[11px] ss:text-[13px] font-medium rounded-[4px] border-solid border-[1px] border-rose-500 hover:bg-rose-500 hover:text-white 
                  active:bg-rose-600 transition-colors duration-300"
          onClick={() => deleteAddress(user?.uid, addresses, address)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

AddressCard.propTypes = {
  address: PropTypes.object.isRequired,
};

export default AddressCard;
