import { useEffect, useRef, useState } from "react";

import { icons } from "../constants";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

const SearchInput = ({ isSearchInput, handleClose }) => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();

  //focus input
  useEffect(() => {
    if (isSearchInput) {
      inputRef.current.focus();
    }
  }, [isSearchInput]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!inputValue) return;
    navigate(`/search?query=${inputValue.toLowerCase()}`);
  };

  return (
    <form
      className={`
      ${isSearchInput ? "w-full flex space-x-2" : "hidden"} 
      sm:flex items-center h-[36px] sm:w-[40%] sm:min-w-[320px] sm:mx-auto  relative`}
      onSubmit={submitHandler}
    >
      {isSearchInput && (
        <div
          className="basis-9 shrink-0 h-full flex justify-center items-center text-xl cursor-pointer rounded-full  hover:bg-rose-50          active:bg-rose-100 transition-colors duration-300"
          onClick={handleClose}
        >
          <icons.backArrow />
        </div>
      )}

      <input
        type="text"
        ref={inputRef}
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full h-full outline-none select-none  pl-5 pr-[70px] border-solid border-[1.5px] border-rose-100  focus:border-rose-300 transition-all ease-out duration-500  rounded-3xl "
      />

      {inputValue && (
        <div
          className="w-[30px] h-[30px] absolute right-9 z-10  flex justify-center items-center rounded-full cursor-pointer bg-white hover:bg-rose-50 transition-all duration-300"
          onClick={() => {
            inputRef.current.focus();
            setInputValue("");
          }}
        >
          <icons.cross />
        </div>
      )}
      <div
        className="w-[30px] h-[30px] flex justify-center items-center cursor-pointer absolute right-[6px] rounded-full bg-white hover:bg-rose-50 transition-all duration-300"
        onClick={submitHandler}
      >
        <icons.search />
      </div>
    </form>
  );
};
SearchInput.propTypes = {
  isSearchInput: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default SearchInput;
