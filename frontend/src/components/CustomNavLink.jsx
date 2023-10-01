import { useContext } from "react";
import styles from "../styles";

import PropTypes from "prop-types";

import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts";

import { getTotalItems } from "../utils";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../constants";

const CustomNavLink = ({ link }) => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  const { userDetails } = useContext(UserContext);
  const { cartItems, wishlist } = userDetails;

  const dataInfo = link.title === "Products" ? "Explore Products" : link.title;

  if (!user && link.id === "profile") {
    return (
      <button
        className={`${styles.buttonOutline} text-sm hidden sm:block ml-5`}
        onClick={() => navigate("/signin")}
      >
        Sign in
      </button>
    );
  }

  const getBadge = () =>
    link.id !== "products" &&
    link.id !== "profile" && (
      <div className="absolute bottom-5 -right-1 bg-rose-500 text-white text-xs font-medium w-5 h-5 flex justify-center items-center rounded-full">
        {link.id === "cart" ? getTotalItems(cartItems) : wishlist.length}
      </div>
    );

  const navLinkIcon = ({ isActive }) =>
    isActive ? (
      <div
        data-info={dataInfo}
        className={`w-9 h-9 flex justify-center items-center rounded-full text-[22px] ss:text-2xl hover:bg-rose-50 transition-all duration-300 relative ml-2 ss:ml-5`}
      >
        <link.activeIcon />
        {user && getBadge()}
      </div>
    ) : (
      <div
        data-info={dataInfo}
        className={`w-9 h-9 flex justify-center items-center rounded-full text-[22px] ss:text-2xl hover:bg-rose-50 active:bg-rose-100 transition-all duration-300 relative ml-2 ss:ml-5`}
      >
        <link.icon />
        {user && getBadge()}
      </div>
    );

  return (
    <div
      className={`${
        link.id === "products" || link.id === "profile" ? "hidden" : "block"
      } sm:block`}
    >
      {link.id === "products" ? (
        <NavLink to={`/${link.id}`} end>
          {navLinkIcon}
        </NavLink>
      ) : (
        <NavLink to={`/${link.id}`}>{navLinkIcon}</NavLink>
      )}
    </div>
  );
};

CustomNavLink.propTypes = {
  link: PropTypes.object.isRequired,
};

export default CustomNavLink;
