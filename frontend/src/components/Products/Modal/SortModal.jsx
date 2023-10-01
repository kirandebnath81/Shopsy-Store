import { useContext } from "react";
import styles from "../../../styles";
import { icons } from "../../../constants";

import { ModalContext } from "../../../contexts";

import { useOutsideClick, useSort } from "../../../custom-hooks";

const SortModal = () => {
  const { setIsSortModal } = useContext(ModalContext);

  //close modal
  const handleClose = () => setIsSortModal(false);

  const nodeRef = useOutsideClick(handleClose);

  const { sortValue, setSortValue } = useSort();

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50 bg-slate-900 bg-opacity-70 flex sm:hidden justify-center items-center">
      <div
        className="w-[85%] max-w-[350px] h-auto max-h-[600px] overflow-y-auto rounded-lg bg-white px-6 py-7 font-montserrat"
        ref={nodeRef}
      >
        <div className="flex items-start justify-between pb-4">
          <div className="text-base font-semibold opacity-80 mr-8">SORT</div>

          <div className={`${styles.closeBtn}`} onClick={handleClose}>
            <icons.cross />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center">
            <input
              type="radio"
              name="sorting"
              value=""
              checked={sortValue === ""}
              id="default"
              onChange={(e) => setSortValue(e.target.value)}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="default" className="text-[15px] cursor-pointer">
              Default
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              name="sorting"
              value="ascending"
              checked={sortValue === "ascending"}
              id="ascending"
              onChange={(e) => setSortValue(e.target.value)}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="ascending" className="text-[15px] cursor-pointer">
              Price Low to High
            </label>
          </div>

          <div className="flex items-center ">
            <input
              type="radio"
              name="sorting"
              value="descending"
              checked={sortValue === "descending"}
              id="descending"
              onChange={(e) => setSortValue(e.target.value)}
              className="mr-2 cursor-pointer"
            />
            <label htmlFor="descending" className="text-[15px] cursor-pointer">
              Price High to Low
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortModal;
