import { useContext } from "react";
import styles from "../../../styles";
import { icons, filtersInfo } from "../../../constants";

import { ModalContext } from "../../../contexts";

import { useOutsideClick } from "../../../custom-hooks";

import FilterInput from "../Filters/FilterInput";
import RatingsFilter from "../Filters/RatingsFilter";
import ClearFilters from "../Filters/ClearFilters";

const FiltersModal = () => {
  const { setIsFiltersModal } = useContext(ModalContext);

  const nodeRef = useOutsideClick(() => setIsFiltersModal(false));

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50 bg-slate-900 bg-opacity-70 flex sm:hidden justify-center items-center">
      <div
        className="w-[95%] max-w-[650px] h-auto max-h-[600px] overflow-y-auto rounded-lg bg-white px-6 py-7 font-montserrat"
        ref={nodeRef}
      >
        <div className="flex items-start justify-between pb-6">
          <div className="flex items-end">
            <div className="text-base font-semibold opacity-80 mr-8">
              FILTERS
            </div>

            <ClearFilters />
          </div>

          <div
            className={`${styles.closeBtn}`}
            onClick={() => setIsFiltersModal(false)}
          >
            <icons.cross />
          </div>
        </div>

        <div className="flex flex-wrap">
          {filtersInfo.map(({ title, id, type, inputList }) => (
            <div key={id} className="mr-5 mb-6">
              <div className="flex text-[13px] font-medium mb-2">{title}</div>

              <div className="space-y-2">
                {inputList.map((details) => (
                  <FilterInput key={details.id} details={details} type={type} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <RatingsFilter />
      </div>
    </div>
  );
};

export default FiltersModal;
