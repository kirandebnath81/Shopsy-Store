import { Suspense } from "react";
import styles from "../styles";
import { Await, useLoaderData, useSearchParams } from "react-router-dom";

import { BeatSpinner, ProductCard } from "../components";

export const Component = () => {
  const dataPromise = useLoaderData();

  const [searchParams] = useSearchParams();

  const searchProduct = searchParams.get("query");

  const getSearchedResult = (data) =>
    data.filter(
      ({ title, brand }) =>
        title.toLowerCase().includes(searchProduct) ||
        brand.toLowerCase().includes(searchProduct)
    );

  return (
    <div className={styles.mainBody}>
      <Suspense fallback={<BeatSpinner />}>
        <Await resolve={dataPromise.data}>
          {(data) =>
            getSearchedResult(data).length !== 0 ? (
              <div>
                <div className="mb-10 text-xl ss:text-2xl font-medium text-center">
                  Searched Results
                </div>
                <div className="w-full flex flex-wrap justify-center gap-x-6  xs:gap-x-9 gap-y-8">
                  {getSearchedResult(data).map((item) => (
                    <ProductCard key={item.id} productData={item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center font-medium text-xl ss:text-2xl pt-5">
                No Matching Result Found
              </div>
            )
          }
        </Await>
      </Suspense>
    </div>
  );
};

Component.displayName = "SearchedItems";

export { default as ErrorBoundary } from "../components/ErrorBoundary";
