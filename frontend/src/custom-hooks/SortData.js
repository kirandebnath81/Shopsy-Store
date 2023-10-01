import { useSearchParams } from "react-router-dom";

const useSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSortValue = (value) => {
    setSearchParams((prevParams) => {
      if (value) {
        prevParams.set("sort", value);
      } else {
        prevParams.delete("sort");
      }

      return prevParams;
    });
  };

  const sortValue = searchParams.get("sort") || "";

  return { sortValue, setSortValue };
};

export default useSort;
