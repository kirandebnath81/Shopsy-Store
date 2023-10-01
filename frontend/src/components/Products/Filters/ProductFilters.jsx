import { useState } from "react";

import { filtersInfo, icons } from "../../../constants";

import FilterInput from "./FilterInput";
import RatingsFilter from "./RatingsFilter";
import ClearFilters from "./ClearFilters";
import { useSearchParams } from "react-router-dom";

const ProductFilters = () => {
  const [searchParams] = useSearchParams();

  const [toggleFilterInputs, setToggleFilterInputs] = useState({
    category: searchParams.get("category") || false,
    size: searchParams.get("size") || false,
    brand: searchParams.get("brand") || false,
    gender: searchParams.get("gender") || false,
    others: searchParams.get("others") || false,
  });

  const handleToggle = (type) =>
    setToggleFilterInputs((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <div className="h-full w-full">
      <div className="flex items-end justify-between border-b-2 border-solid border-gray-100 px-4 py-6">
        <div className="text-lg font-semibold opacity-90">FILTERS</div>

        <ClearFilters />
      </div>

      {filtersInfo.map(({ title, id, type, inputList }) => (
        <div key={id} className="border-b-2 border-solid border-gray-100">
          <div
            className="flex justify-between items-center text-sm font-semibold opacity-90 px-4 py-[18px] cursor-pointer"
            onClick={() => handleToggle(type)}
          >
            <div>{title}</div>

            <div className="text-xl">
              {toggleFilterInputs[type] ? (
                <icons.arrowDown />
              ) : (
                <icons.arrowUp />
              )}
            </div>
          </div>

          {toggleFilterInputs[type] && (
            <div className="space-y-2 px-4 pb-5">
              {inputList.map((details) => (
                <FilterInput key={details.id} details={details} type={type} />
              ))}
            </div>
          )}
        </div>
      ))}

      <RatingsFilter />
    </div>
  );
};

export default ProductFilters;
