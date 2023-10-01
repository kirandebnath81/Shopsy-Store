import { useContext, useState } from "react";
import styles from "../styles";
import { icons } from "../constants";
import { ModalContext, UserContext } from "../contexts";
import AddressCard from "./Address/AddressCard";

const CheckoutAddressCard = () => {
  const [isSelectAddress, setIsSelectAddress] = useState(false);

  const { userDetails, setUserDetails } = useContext(UserContext);

  const { addresses, selectedAddressId } = userDetails;

  const { setIsCreateAddressModal } = useContext(ModalContext);

  const createAddressHandler = () => {
    setUserDetails((prev) => ({ ...prev, editedAddress: null }));
    setIsCreateAddressModal(true);
  };

  const selectedAddress =
    selectedAddressId && addresses.find(({ id }) => id === selectedAddressId);

  return (
    <div>
      {isSelectAddress ? (
        <div className="p-0 ss:pt-5 ss:px-8 ss:pb-8  rounded-lg shadow-none ss:shadow-secondary">
          <div className="flex justify-between mb-10">
            <div className="font-medium text-lg ss:text-xl">
              Select a delivery address
            </div>
            <div
              className={`${styles.closeBtn}`}
              onClick={() => setIsSelectAddress(false)}
            >
              <icons.cross />
            </div>
          </div>

          <div className="space-y-8">
            {addresses?.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
          </div>

          <button
            className="flex items-center text-sm ss:text-[15px] xs:text-base font-semibold opacity-50 hover:opacity-80 transition-opacity duration-300 space-x-2 mt-8"
            onClick={createAddressHandler}
          >
            <span className="text-xl">
              <icons.increase />
            </span>
            <span>ADD NEW ADDRESS</span>
          </button>
        </div>
      ) : (
        <div className="xs:flex items-start justify-between gap-x-10 p-4 rounded-lg shadow-secondary">
          {selectedAddress ? (
            <>
              <div className="text-base ss:text-lg font-semibold opacity-80 whitespace-nowrap">
                Delivery Address :
              </div>
              <div className="text-sm ss:text-base font-medium opacity-90 mt-3 xs:mt-0">
                <div>{selectedAddress?.fullName}</div>
                <div>
                  {selectedAddress?.area}, {selectedAddress?.city}-
                  {selectedAddress?.pincode}, {selectedAddress?.state}
                </div>
              </div>
            </>
          ) : (
            <div className="font-medium text-base ss:text-lg">
              Address is not selected
            </div>
          )}

          <button
            className="font-medium text-xs ss:text-sm border-rose-500 border-solid border-[1px] px-2 py-1 rounded-[4px] hover:bg-rose-500 hover:text-white transition-colors duration-300 mt-5 xs:mt-0"
            onClick={() => setIsSelectAddress(true)}
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutAddressCard;
