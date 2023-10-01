import { useContext } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../constants";
import { addCartItems } from "../../utils";

const ProductBtn = ({ product, productCount, type }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [user] = useAuthState(auth);
  const { userDetails } = useContext(UserContext);
  const { cartItems } = userDetails;

  const handleAddtoCart = (product) => {
    if (!user) {
      navigate("/signin/?message=You must Sign in first", {
        state: pathname,
      });
    } else {
      const newCartItems = [{ ...product, count: productCount }, ...cartItems];
      addCartItems(user.uid, newCartItems);
    }
  };

  const isItemAddedToCart = cartItems?.find(({ id }) => id === product.id);

  if (isItemAddedToCart) {
    return (
      <button
        className={`${
          type === "wishlist"
            ? "text-xs px-3 py-[6px] mt-2"
            : "text-base px-7 py-2 mt-8"
        } font-medium rounded-md text-white bg-rose-500 border-solid border-[1px] border-rose-500`}
        onClick={() => navigate("/cart")}
      >
        Go to Cart
      </button>
    );
  } else {
    return (
      <button
        className={` ${
          type === "wishlist"
            ? "text-xs px-3 py-[6px]"
            : "text-base px-7 py-2 mt-8"
        } font-medium  text-rose-500 border-solid border-[1px] border-rose-500 rounded-md hover:bg-rose-500 hover:text-white transition-colors duration-300`}
        onClick={() => handleAddtoCart(product)}
      >
        Add to Cart
      </button>
    );
  }
};

ProductBtn.propTypes = {
  product: PropTypes.object.isRequired,
  productCount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ProductBtn;
