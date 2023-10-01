import { createContext, useState } from "react";

import PropTypes from "prop-types";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isFiltersModal, setIsFiltersModal] = useState(false);
  const [isSortModal, setIsSortModal] = useState(false);
  const [isCreateAddressModal, setIsCreateAddressModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isFiltersModal,
        setIsFiltersModal,
        isSortModal,
        setIsSortModal,
        isCreateAddressModal,
        setIsCreateAddressModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
