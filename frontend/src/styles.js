const styles = {
  mainBody: "w-full min-h-screen font-montserrat px-3 sm:px-6",

  inputField:
    "w-full h-9 ss:h-10 rounded-lg indent-3 outline-none text-sm ss:text-base bg-transparent border-solid border-[1px] transition-all duration-300",

  errorInput: "border-red-500 focus:border-red-500",

  correctInput: "border-slate-300 focus:border-slate-800",

  PasswrodInputEye:
    "absolute right-2 top-[5px] ss:top-[6px] cursor-pointer text-base p-[5px] ss:p-[6px] rounded-full hover:bg-slate-200 active:bg-slate-300 transition-colors duration-300 transform translateZ(0)",

  buttonOutline:
    "px-3 py-1 font-medium  border-rose-500 border-solid border-[1px] rounded-[4px]   hover:bg-rose-500 hover:text-white active:bg-rose-600   transition-colors duration-300",

  largeButtonFill:
    "w-fit px-4 ss:px-5 sm:px-7 py-[8px] ss:py-[10px] bg-rose-600 text-white text-sm ss:text-base sm:text-lg font-semibold rounded-md hover:bg-rose-700 active:bg-rose-600 transition-colors duration-300",

  closeBtn:
    "bg-slate-100 text-xl p-[6px] rounded-full cursor-pointer hover:bg-slate-200 active:bg-slate-100 transition-colors duration-300",
};

export default styles;
