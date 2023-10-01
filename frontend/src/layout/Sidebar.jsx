import { useContext, useState } from "react";
import styles from "../styles";
import { icons, sidebarNavLinks } from "../constants";

import useOutsideClick from "../custom-hooks/OutsideClick";

import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../contexts";

const Sidebar = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(UserContext);
  const [isSidebar, setIsSidebar] = useState(false);

  const handleCloseSidebar = () => setIsSidebar(false);

  const nodeRef = useOutsideClick(() => setIsSidebar(false));

  //sign in
  const handleSignIn = () => {
    navigate("/signin");
    handleCloseSidebar();
  };

  return (
    <div>
      <div
        className={`block sm:hidden text-[28px] ss:text-3xl mr-1 p-1 cursor-pointer rounded-full hover:bg-rose-50 active:bg-rose-100 transition-all duration-300`}
        onClick={() => setIsSidebar(true)}
      >
        <icons.menu />
      </div>
      <div
        className={`sm:hidden absolute top-0 left-0 z-40 w-full min-h-screen bg-black ${
          isSidebar ? " bg-opacity-80 visible" : "invisible bg-opacity-5"
        } transition-all duration-[400ms]`}
      >
        <div
          ref={nodeRef}
          className={`fixed top-0 ${
            isSidebar ? "left-0" : "-left-[650px]"
          } w-[75%] ss:w-[60%]
          xs:w-[50%] h-screen bg-white transition-all ease-out duration-700`}
        >
          <div
            className={`w-full py-7 flex items-center shadow-primary pl-6 xs:pl-8 pr-2 mb-10 ${
              userDetails?.name
                ? "bg-rose-500 text-white"
                : "bg-white text-black"
            } `}
          >
            {userDetails?.name ? (
              <div className="flex items-center gap-x-[10px] ss:gap-x-3">
                <span className="text-2xl">
                  <icons.userFill />
                </span>
                <span className="font-semibold text-lg ss:text-lg">
                  {userDetails?.name}
                </span>
              </div>
            ) : (
              <div>
                <div className="font-medium opacity-90">
                  <div className="text-[17px] mb-1">Welcome</div>
                  <div>To access Wishlist or Cart</div>
                </div>

                <button
                  className={`${styles.buttonOutline} text-sm mt-[10px]`}
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>

          <div className="pl-4 w-[70%]">
            <ul>
              {sidebarNavLinks.map(({ title, id }) => (
                <li key={id} className="w-full h-10 mb-4">
                  <NavLink
                    className="w-full h-full pl-4 xs:pl-6 flex items-center rounded-lg font-medium opacity-80 hover:bg-rose-100 active:bg-rose-200 transition-colors duration-300"
                    key={id}
                    to={`${id !== "home" ? id : "/"}`}
                    style={({ isActive }) => ({
                      color: isActive ? "#F43F5E" : "black",
                      fontWeight: isActive ? "600" : "500",
                    })}
                    onClick={handleCloseSidebar}
                  >
                    {title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
