import { useSearchParams } from "react-router-dom";

const ClearFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const clearHandler = () => {
    const deleteFilterList = [
      "category",
      "size",
      "brand",
      "gender",
      "others",
      "rating",
    ];

    setSearchParams((prevParams) => {
      for (const deleteFilter of deleteFilterList) {
        prevParams.delete(deleteFilter);
      }
      return prevParams;
    });
  };

  return (
    <button
      className="text-[13px] text-rose-500 font-semibold opacity-70 hover:opacity-95 transition-colors duration-300 active:opacity-70"
      onClick={clearHandler}
    >
      CLEAR ALL
    </button>
  );
};

export default ClearFilters;
