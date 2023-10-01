import { useState, useEffect } from "react";

import { icons, mainNavLinks } from "../constants";

import { useNavigate } from "react-router-dom";

import { SearchInput, CustomNavLink } from "../components";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const navigate = useNavigate();

  const [isSearchInput, setIsSearchInput] = useState(false);

  const closeSearchInput = () => setIsSearchInput(false);

  //closing the search input in large screen
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth > 768) {
        setIsSearchInput(false);
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-20 w-full h-20 shadow-primary px-[14px]  sm:px-6 font-montserrat bg-white">
      {isSearchInput ? (
        <div className="w-full h-full flex items-center">
          <SearchInput
            isSearchInput={isSearchInput}
            handleClose={closeSearchInput}
          />
        </div>
      ) : (
        <div className="w-full h-full flex justify-between items-center">
          <Sidebar />

          <div
            className="font-semibold text-[22px] ss:text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-rose-500">S</span>hopsy
          </div>

          <div className="flex-1">
            <SearchInput isSearchInput={isSearchInput} />
          </div>

          <div
            data-info="Search"
            className="flex justify-center items-center sm:hidden text-xl cursor-pointer w-9 h-9  rounded-full  hover:bg-rose-50 active:bg-rose-100 transition-all duration-300"
            onClick={() => setIsSearchInput(true)}
          >
            <icons.search />
          </div>

          {/* Nav links */}
          <ul className="list-none flex items-center ">
            {mainNavLinks.map((link) => (
              <li key={link.id}>
                <CustomNavLink link={link} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
