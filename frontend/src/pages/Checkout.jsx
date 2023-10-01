import { useContext, useState } from "react";
import styles from "../styles";

import { auth, icons, images } from "../constants";

import { v4 } from "uuid";
import axios from "axios";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { UserContext, ModalContext } from "../contexts";

import {
  addCartItems,
  addOrderedItems,
  formatOrderDate,
  getTotalAmount,
  getTotalItems,
  loadRazorpayScript,
} from "../utils";

import { CheckoutAddressCard, CreateAddressModal } from "../components";
import { ClipLoader } from "react-spinners";

//local server base url
//const BASE_URL = "http://localhost:5000/api/payment";

//production server base url
const BASE_URL = "https://shopsy-store-api.vercel.app/api/payment";

export const Component = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const { userDetails } = useContext(UserContext);
  const { name, email, cartItems, addresses, orders, selectedAddressId } =
    userDetails;

  const { isCreateAddressModal } = useContext(ModalContext);

  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedAddress =
    selectedAddressId && addresses.find(({ id }) => id === selectedAddressId);

  const showRazorpay = async () => {
    setIsLoading(true);
    try {
      await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    } catch (error) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsLoading(false);
      return;
    }

    //creating a new order
    const orderUrl = `${BASE_URL}/orders`;

    const result = await axios.post(orderUrl, {
      amount: getTotalAmount(cartItems),
    });

    if (!result) {
      alert("Server error. Are you online");
      setIsLoading(false);
      return;
    }

    //getting the order details
    const { id, amount, currency } = result.data;

    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount,
      currency,
      name: "Shopsy",
      description: "Test Transaction",
      image: images.logo,
      order_id: id,
      handler: async function (response) {
        try {
          const verifyUrl = `${BASE_URL}/verify`;
          const { data } = await axios.post(verifyUrl, response);
          setPaymentSuccessMsg(data.message);
          const newOrder = {
            amount: getTotalAmount(cartItems),
            date: formatOrderDate(),
            address: selectedAddress,
            viewAddress: false,
            products: cartItems,
            orderInfo: response,
            id: v4(),
          };
          addOrderedItems(user?.uid, [newOrder, ...orders]);
          addCartItems(user?.uid, []);
        } catch (error) {
          console.log(error);
        }
      },

      prefill: {
        name,
        email,
        contact: "9435290705",
      },

      theme: {
        color: "#F43F5E",
      },
    };
    setIsLoading(false);
    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  if (paymentSuccessMsg) {
    return (
      <div
        className={`${styles.mainBody} flex flex-col items-center mt-10 space-y-8 `}
      >
        <div className="font-medium text-lg ss:text-xl sm:text-2xl text-center">
          {paymentSuccessMsg}
        </div>
        <button
          onClick={() => navigate("/profile/orders")}
          className={`${styles.buttonOutline} px-8 py-2 text-[15px] sm:text-base`}
        >
          View Order
        </button>
      </div>
    );
  }

  return (
    <>
      {isCreateAddressModal && <CreateAddressModal />}

      <div className={`${styles.mainBody} max-w-[700px] mx-auto`}>
        <div className="text-xl ss:text-2xl font-medium text-center mb-10">
          Checkout
        </div>

        <div className="space-y-10">
          <CheckoutAddressCard />

          <div className="w-full shadow-secondary p-6 rounded-lg">
            <div className="flex justify-between items-center font-semibold mb-12 ss:mb-16">
              <div className="text-lg ss:text-xl opacity-80">
                SubTotal ({getTotalItems(cartItems)} items)
              </div>
              <div className="text-xl ss:text-[22px] xs:text-2xl">
                &#8377; {getTotalAmount(cartItems)}
              </div>
            </div>

            {selectedAddress ? (
              <button
                onClick={showRazorpay}
                className="w-full py-2 rounded-[4px] text-white bg-rose-500 hover:bg-rose-600 active:bg-rose-500 transition-colors duration-300"
              >
                {isLoading ? (
                  <ClipLoader color="#FFFFFF " size={25} />
                ) : (
                  <span className="text-lg font-medium inline-block p-[2px]">
                    Place Order
                  </span>
                )}
              </button>
            ) : (
              <button
                disabled
                className="cursor-not-allowed opacity-70
                  w-full py-2 text-sm ss:text-base font-medium rounded-[4px] text-white bg-rose-500"
              >
                Place Order
              </button>
            )}

            {!selectedAddress && (
              <div className="flex items-center text-red-600 mt-3 font-medium text-sm ss:text-base xs:text-lg">
                <span className="mr-1 ">
                  <icons.error />
                </span>
                <span>Select an address to place the order</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

Component.diplayName = "Checkout";
