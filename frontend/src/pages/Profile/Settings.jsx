import { useContext } from "react";
import { UserContext } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../constants";
import { useAuthState } from "react-firebase-hooks/auth";

export const Component = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { setUserDetails, userDetails } = useContext(UserContext);

  const handleSignout = async () => {
    try {
      await signOut(auth);

      setUserDetails({
        name: "",
        cartItems: [],
        wishlist: [],
        addresses: [],
        orders: [],
        selectedAddressId: "",
        setEditedAddress: null,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-[460px] h-auto p-4 ss:p-8 rounded-md shadow-secondary">
      <div className="space-y-3 text-base ss:text-lg">
        <div>
          <span>Name : </span>
          <span className="font-medium ">{userDetails?.name}</span>
        </div>
        <div>
          <span>Email : </span>
          <span className="font-medium ">{user?.email}</span>
        </div>
      </div>
      <button
        onClick={handleSignout}
        className="px-3 ss:px-4 py-[6px] text-sm ss:text-base font-medium rounded-[5px] text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-500 transition-colors duration-300 mt-6"
      >
        Sign out
      </button>
    </div>
  );
};

Component.displayName = "Settings";
