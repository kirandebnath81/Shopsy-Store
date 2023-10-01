import { useContext } from "react";
import styles from "../styles";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts";

import { getTotalItems, getTotalPrice, getTotalAmount } from "../utils";
import { CartItemCard, EmptyProductsList } from "../components";

export const Component = () => {
  const { userDetails } = useContext(UserContext);
  const { cartItems } = userDetails;
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="text-center pt-5">
        <EmptyProductsList message="Your Products Cart is Empty" />
      </div>
    );
  }

  return (
    <div className={`${styles.mainBody} max-w-[1050px] mx-auto`}>
      <div className="text-xl ss:text-2xl font-medium text-center mb-10">
        Shopping Cart
      </div>
      <div className="sm:flex sm:space-x-9">
        <div className="flex-1 space-y-8">
          {userDetails?.cartItems?.map((item) => (
            <CartItemCard key={item.id} data={item} />
          ))}
        </div>
        <div className="w-full sm:basis-[35%] sm:min-w-[290px] h-full sm:mt-0 mt-16  shadow-secondary rounded-lg">
          <div className="font-semibold text-lg opacity-60 px-6 py-4">
            PRICE DETAILS
          </div>
          <div className="w-full h-[2px] bg-gray-100"></div>

          <div className="font-medium px-6 py-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>Price ({getTotalItems(cartItems)} items)</div>
                <div className="text-[17px]">
                  &#8377; {getTotalPrice(cartItems)}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>Discount</div>
                <div className="text-green-600 text-[17px]">
                  - &#8377;{" "}
                  {getTotalPrice(cartItems) - getTotalAmount(cartItems)}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>Delivery Charges</div>
                <div className="text-green-600">Free</div>
              </div>

              <div className="w-full h-[2px] bg-gray-100"></div>

              <div className="flex justify-between items-center font-semibold text-lg">
                <div>Total Amount</div>
                <div className="text-[20px]">
                  &#8377; {getTotalAmount(cartItems)}
                </div>
              </div>
              <div className="w-full h-[2px] bg-gray-100"></div>
            </div>

            <button
              className="w-full h-9 text-[15px] mt-6 font-medium bg-rose-500 text-white rounded-md hover:bg-rose-600 active:bg-rose-500 transition-colors duration-300"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Component.diplayName = "Cart";
