import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

import { useSearchParams } from "react-router-dom";

import { getRatingIconInfo } from "../../../utils";

const RatingsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRatingFilters = (index) => {
    setSearchParams((prevParams) => {
      prevParams.set("rating", index + 1);
      return prevParams;
    });
  };

  return (
    <div className="px-0 sm:px-4 py-0 sm:py-6  border-none sm:border-solid border-b-2  border-gray-100">
      <div className="text-sm font-medium sm:font-semibold opacity-70 sm:opacity-80 mb-2 sm:mb-3">
        RATINGS
      </div>

      <div>
        {getRatingIconInfo(+searchParams.get("rating") || 0)?.map(
          ({ iconType, id }, index) => (
            <span
              key={id}
              className="inline-block mr-2 text-base sm:text-lg cursor-pointer text-rose-500"
              onClick={() => handleRatingFilters(index)}
            >
              {iconType === "fill" ? (
                <BsStarFill />
              ) : iconType === "outline" ? (
                <BsStar />
              ) : (
                <BsStarHalf />
              )}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default RatingsFilter;
