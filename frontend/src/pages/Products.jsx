import { Suspense, useContext } from "react";
import styles from "../styles";
import { icons } from "../constants";
import { ModalContext } from "../contexts";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { filterProducts, sortProducts } from "../utils";
import { useSort } from "../custom-hooks";
import {
  ProductFilters,
  FiltersModal,
  SortModal,
  ProductCard,
  BeatSpinner,
} from "../components";

export const Component = () => {
  const dataPromise = useLoaderData();
  const [searchParams] = useSearchParams();

  const { isFiltersModal, setIsFiltersModal, isSortModal, setIsSortModal } =
    useContext(ModalContext);

  const { sortValue, setSortValue } = useSort();

  const SortAndFilterProducts = (products) => {
    const sortedProducts = sortProducts(products, sortValue);

    const filters = {
      categoryFilters: searchParams.getAll("category"),
      sizeFilters: searchParams.getAll("size"),
      brandFilters: searchParams.getAll("brand"),
      genderFilters: searchParams.getAll("gender"),
      otherFilters: searchParams.getAll("others"),
      ratingFilter: searchParams.get("rating"),
    };

    return filterProducts(sortedProducts, filters);
  };

  return (
    <>
      {isFiltersModal && <FiltersModal />}
      {isSortModal && <SortModal />}
      <div className={`${styles.mainBody}`}>
        <Suspense fallback={<BeatSpinner />}>
          <Await resolve={dataPromise.products}>
            {(products) => (
              <div className="flex mt-5">
                <div className="hidden sm:block basis-[280px] h-full bg-white shadow-light">
                  <ProductFilters />
                </div>

                <div className="flex-1 px-2 sm:pl-8 sm:pr-3 space-y-6">
                  <div className="flex justify-between">
                    <div className="text-xl font-medium">Collections</div>

                    <div className="flex sm:hidden items-center space-x-4">
                      <span
                        className="text-xl bg-slate-200 p-1 rounded-[4px]  hover:bg-slate-300 active:bg-slate-200 transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsFiltersModal(true)}
                      >
                        <icons.filter />
                      </span>
                      <span
                        className="text-xl bg-slate-200 p-1 rounded-[4px]  hover:bg-slate-300 active:bg-slate-200 transition-colors duration-300 cursor-pointer"
                        onClick={() => setIsSortModal(true)}
                      >
                        <icons.sort />
                      </span>
                    </div>

                    <select
                      value={sortValue}
                      onChange={(e) => setSortValue(e.target.value)}
                      className="hidden sm:block border-solid border-rose-500 border-[1px] rounded-md px-3 py-[5px] outline-rose-400 text-[15px] "
                    >
                      <option value="">Default</option>
                      <option value="ascending">Price Low to High</option>
                      <option value="descending">Price High to Low</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-5 gap-y-8">
                    {SortAndFilterProducts(products).length !== 0 ? (
                      SortAndFilterProducts(products).map((product) => (
                        <ProductCard key={product.id} productData={product} />
                      ))
                    ) : (
                      <div className="text-center font-medium text-xl ss:text-2xl pt-5">
                        No Matching Result Found
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

Component.displayName = "ProductsPage";

export { default as ErrorBoundary } from "../components/ErrorBoundary";
