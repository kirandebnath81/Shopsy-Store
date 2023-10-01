import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "../contexts/userContext";

export const Component = () => {
  const { userDetails } = useContext(UserContext);

  if (userDetails?.uid) {
    return <Navigate to={"/"} replace={true} />;
  }

  return <Outlet />;
};

Component.displayName = "AllowedWhenNotAuth";
