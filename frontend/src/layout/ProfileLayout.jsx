import styles from "../styles";
import { NavLink, Outlet } from "react-router-dom";

export const Component = () => {
  const activeStyle = {
    borderBottom: "2px solid #F43F5E",
    opacity: 1,
  };

  return (
    <div className={`${styles.mainBody} max-w-[1000px] mx-auto`}>
      <div className="text-2xl xs:text-[28px] font-medium mb-8">
        Your Profile
      </div>
      <nav className="mb-16 space-x-4 ss:space-x-8 xs:space-x-14">
        <NavLink
          to={"."}
          end
          className="text-base ss:text-lg font-medium p-[5px] opacity-75 hover:text-rose-600 transition-all duration-200"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Settings
        </NavLink>
        <NavLink
          to={"addresses"}
          className="text-base ss:text-lg font-medium opacity-75 p-[5px] hover:text-rose-600 transition-all duration-200"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Addresses
        </NavLink>
        <NavLink
          to={"orders"}
          className="text-base ss:text-lg font-medium opacity-75 p-[5px] hover:text-rose-600 transition-all duration-200"
          style={({ isActive }) => (isActive ? activeStyle : null)}
        >
          Orders
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

Component.diplayName = "ProfileLayout";
