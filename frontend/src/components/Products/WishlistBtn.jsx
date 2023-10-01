import { useContext } from "react";
import { auth, icons } from "../../constants";

import PropTypes from "prop-types";

import { UserContext } from "../../contexts";
import { addWishlistItems, deleteWishlistItem } from "../../utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";

const WishlistBtn = ({ data }) => {
  const [user] = useAuthState(auth);
  const { userDetails } = useContext(UserContext);
  const { wishlist } = userDetails;

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddWishlist = () => {
    if (!user) {
      navigate("/signin?message=You must Sign in first", {
        state: location.pathname + location.search,
      });
    } else {
      addWishlistItems(user.uid, [data, ...wishlist]);
    }
  };

  if (wishlist.find(({ id }) => id === data.id)) {
    return (
      <div
        className="absolute right-3 top-3 text-2xl cursor-pointer text-rose-400"
        onClick={() => deleteWishlistItem(user.uid, wishlist, data)}
      >
        <icons.wishlistFill />
      </div>
    );
  } else {
    return (
      <div
        className="absolute right-3 top-3 text-2xl cursor-pointer text-rose-400"
        onClick={handleAddWishlist}
      >
        <icons.wishlist />
      </div>
    );
  }
};

WishlistBtn.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WishlistBtn;
