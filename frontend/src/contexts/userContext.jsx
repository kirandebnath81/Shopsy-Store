import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    uid: "",
    cartItems: [],
    wishlist: [],
    addresses: [],
    orders: [],
    selectedAddressId: "",
    editedAddress: null,
  });
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
