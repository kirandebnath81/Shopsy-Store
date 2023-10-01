import { Suspense, useState } from "react";
import styles from "../styles";
import { icons } from "../constants";

import { Await, useLoaderData } from "react-router-dom";

import { getRatingIconInfo, getSellingPrice } from "../utils";

import {
  BeatSpinner,
  WishlistBtn,
  ProductBtn,
  ProductCard,
} from "../components";

export const Component = () => {
  const dataPromise = useLoaderData();
  const [productCount, setProductCount] = useState(1);

  const handleQuantity = (type) => {
    if (type === "increase") {
      setProductCount((prevCount) => prevCount + 1);
    } else {
      setProductCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        } else {
          return prevCount;
        }
      });
    }
  };

  return (
    <div className={`${styles.mainBody} max-w-[950px] mx-auto mt-7`}>
      {/* product details */}
      <Suspense fallback={<BeatSpinner />}>
        <Await resolve={dataPromise.product}>
          {(product) => (
            <div
              className={`flex flex-col items-center sm:items-start sm:flex-row space-x-0 sm:space-x-12 space-y-12 sm:space-y-0`}
            >
              <div className="basis-full ss:max-w-[300px] sm:max-w-none sm:basis-[35%] relative">
                <img
                  src={product.imgUrl}
                  alt="product"
                  className="rounded-xl shadow-extralight w-full max-h-[420px] object-cover"
                />
                {/* get relevent wishlist btn */}
                <WishlistBtn data={product} />
              </div>

              <div className="flex-1 max-w-[650px] sm:max-w-none">
                <div className="font-bold text-xl text-sky-900">
                  {product.title}
                </div>

                <div className="my-4">
                  {getRatingIconInfo(product.ratings)?.map(
                    ({ iconType, id }) => (
                      <span
                        key={id}
                        className="inline-block mr-2 text-base sm:text-lg cursor-pointer text-rose-500"
                      >
                        {iconType === "fill" ? (
                          <icons.starFill />
                        ) : iconType === "outline" ? (
                          <icons.star />
                        ) : (
                          <icons.starHalf />
                        )}
                      </span>
                    )
                  )}
                  ({product.ratingsCount})
                </div>
                <div>
                  <div className="font-semibold mb-1 text-sky-900">
                    Details:
                  </div>
                  <div className="text-[15.5px]">{product.description}</div>
                </div>

                {product.deliveryDays === 1 && (
                  <div className="mt-2 font-medium text-sky-900 ">
                    Fast delivery is available
                  </div>
                )}

                <div className="my-4 font-bold text-[21px] text-sky-900">
                  &#8377; {getSellingPrice(product.amount, product.discount)}
                </div>

                <div className="flex">
                  <span className="text-sky-900 font-semibold text-lg mr-3">
                    Quantity :
                  </span>
                  <button
                    className="w-8 h-8 flex justify-center items-center text-lg border-solid border-[1px] border-rose-500 active:bg-rose-500 transition-colors duration-300"
                    onClick={() => handleQuantity("decrease")}
                  >
                    <icons.decrease />
                  </button>
                  <span className="w-8 h-8 flex justify-center items-center text-lg border-y-[1px] border-solid border-rose-500">
                    {productCount}
                  </span>
                  <button
                    className="w-8 h-8 flex justify-center items-center text-lg border-solid border-[1px] border-rose-500 active:bg-green-500 transition-colors duration-300"
                    onClick={() => handleQuantity("increase")}
                  >
                    <icons.increase />
                  </button>
                </div>

                {!product.stock ? (
                  <div className="w-fit mt-10 border-solid border-rose-300 border-[1px] px-4 py-[6px] rounded-[5px] text-rose-400 font-medium">
                    Out of Stock
                  </div>
                ) : (
                  <ProductBtn
                    product={product}
                    productCount={productCount}
                    type="singleProduct"
                  />
                )}
              </div>
            </div>
          )}
        </Await>
      </Suspense>
      {/* similar products */}
      <Suspense>
        <Await resolve={dataPromise.similarProducts}>
          {(products) => (
            <div className="mt-24">
              <div className="text-lg ss:text-xl font-medium text-center ss:text-left">
                Related Products
              </div>
              <div className="flex flex-wrap justify-center ss:justify-normal mt-10 gap-x-5 xs:gap-x-10 gap-y-10">
                {products.map((product) => (
                  <ProductCard key={product.id} productData={product} />
                ))}
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

Component.displayName = "SingleProduct";

export { default as ErrorBoundary } from "../components/ErrorBoundary";
