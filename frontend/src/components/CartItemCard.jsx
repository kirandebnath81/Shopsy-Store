import PropTypes from "prop-types";

import { auth, icons } from "../constants";
import { useContext } from "react";
import { UserContext } from "../contexts";

import {
  addWishlistItems,
  deleteCartItem,
  formatDeliveryDate,
  getSellingPrice,
  setItemQuantity,
} from "../utils";
import { useAuthState } from "react-firebase-hooks/auth";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const CartItemCard = ({ data }) => {
  const [user] = useAuthState(auth);
  const { userDetails } = useContext(UserContext);
  const { cartItems, wishlist } = userDetails;

  const navigate = useNavigate();

  const saveToWishlist = () => {
    if (wishlist.find(({ id }) => id === data.id)) {
      deleteCartItem(user?.uid, cartItems, data);
    } else {
      deleteCartItem(user?.uid, cartItems, data);
      addWishlistItems(user?.uid, wishlist, data);
    }
  };

  const handleNavigate = () =>
    navigate(`/products/${data.category}/${data.title}/${data.id}`);

  return (
    <div className="flex space-x-4 ss:space-x-6 rounded-lg px-[10px] py-3 ss:p-4 shadow-secondary font-montserrat cursor-pointer">
      <div
        className="basis-[30%] ss:basis-[25%] h-full"
        onClick={handleNavigate}
      >
        <LazyLoadImage
          src={data.imgUrl}
          alt={data.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="space-y-3">
        <div
          className="font-medium text-[15px] ss:text-lg cursor-pointer"
          onClick={handleNavigate}
        >
          {data.title}
        </div>

        <div className="font-semibold space-x-[6px] ss:space-x-2">
          <span className="text-[15px] ss:text-lg">
            &#8377;{getSellingPrice(data.amount, data.discount)}
          </span>

          <span className="line-through font-medium text-xs ss:text-sm opacity-75">
            &#8377;{data.amount}
          </span>

          <span className="font-semibold text-xs ss:text-sm opacity-80 text-green-700">
            {data.discount}% Off
          </span>
        </div>

        <div className="flex ">
          <div className="flex">
            <button
              className="w-5 ss:w-7 h-5 ss:h-7 flex justify-center items-center text-xs ss:text-base border-solid border-[1px] border-rose-500 active:bg-rose-500 transition-colors duration-300"
              onClick={() =>
                setItemQuantity(data, cartItems, "decrease", user?.uid)
              }
            >
              {data.count > 1 ? <icons.decrease /> : <icons.delete />}
            </button>

            <span className="w-5 ss:w-7 h-5 ss:h-7 flex justify-center text-xs ss:text-base items-center border-y-[1px] border-solid border-rose-500 font-medium">
              {data.count}
            </span>

            <button
              className="w-5 ss:w-7 h-5 ss:h-7  flex justify-center items-center text-xs ss:text-base border-solid border-[1px] border-rose-500 active:bg-green-500 transition-colors duration-300"
              onClick={() =>
                setItemQuantity(data, cartItems, "increase", user?.uid)
              }
            >
              <icons.increase />
            </button>
          </div>
          <button
            className="font-medium text-xs ss:text-sm text-blue-600 ml-[10px] ss:ml-3 hover:text-blue-800 active:text-blue-600 transition-colors duration-300"
            onClick={() => saveToWishlist()}
          >
            Save to Wishlist
          </button>
        </div>

        <div className="text-[10px] ss:text-sm  font-medium opacity-90">
          Delivery by {formatDeliveryDate(data.deliveryDays)} |{" "}
          <span className="text-green-700">Free</span>{" "}
          <span className="line-through opacity-70">
            &#8377;{50 * data.count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

CartItemCard.propTypes = {
  data: PropTypes.object.isRequired,
};
