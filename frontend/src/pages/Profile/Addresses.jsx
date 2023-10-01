import { useContext } from "react";
import { icons } from "../../constants";
import { ModalContext, UserContext } from "../../contexts";
import { AddressCard, CreateAddressModal } from "../../components";

export const Component = () => {
  const { isCreateAddressModal, setIsCreateAddressModal } =
    useContext(ModalContext);

  const { userDetails, setUserDetails } = useContext(UserContext);
  const { addresses } = userDetails;

  const createHandler = () => {
    setUserDetails((prev) => ({ ...prev, editedAddress: null }));
    setIsCreateAddressModal(true);
  };

  return (
    <>
      {isCreateAddressModal && <CreateAddressModal />}

      <div className="w-full max-w-[600px]">
        <button
          className="flex items-center text-[15px] ss:text-lg xs:text-[19px] font-semibold opacity-50 hover:opacity-80 transition-opacity duration-300 space-x-2 mb-8"
          onClick={createHandler}
        >
          <span className="text-2xl">
            <icons.increase />
          </span>
          <span>ADD NEW ADDRESS</span>
        </button>

        <div className="space-y-8">
          {addresses?.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      </div>
    </>
  );
};

Component.displayName = "Address";
