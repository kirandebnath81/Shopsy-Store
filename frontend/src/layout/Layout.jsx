import { useContext, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../contexts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../constants";
import { fetchUserDetails } from "../utils";

//components
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const [user] = useAuthState(auth);
  const { setUserDetails } = useContext(UserContext);
  const { pathname } = useLocation();

  //scroll to the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  //fetch user data
  useEffect(() => {
    if (user) {
      fetchUserDetails(user.uid, setUserDetails);
    }
  }, [user, setUserDetails]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ToastContainer position="bottom-center" autoClose={1200} />
      <Navbar />
      <main className="mt-28 mb-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
