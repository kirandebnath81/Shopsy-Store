import PropTypes from "prop-types";

import { useLocation, useNavigate } from "react-router-dom";

import { getSellingPrice } from "../../utils";
import WishlistBtn from "./WishlistBtn";
import ProductBtn from "./ProductBtn";

import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductCard = ({ productData }) => {
  const { title, category, imgUrl, brand, amount, discount, sizes, stock, id } =
    productData;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="w-full max-w-[220px] ss:basis-[23%] min-w-[190px] rounded-lg overflow-hidden shadow-extralight hover:shadow-secondary hover:-translate-y-2 transition-all duration-300 flex flex-col relative bg-white">
      {/* relevent wishlist btn */}
      <WishlistBtn data={productData} />

      <div
        className="w-full flex-1 min-h-[250px] cursor-pointer"
        onClick={() => navigate(`/products/${category}/${title}/${id}`)}
      >
        <LazyLoadImage
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className=" px-[10px] space-y-1 pt-3 pb-5">
        <div className="font-semibold opacity-50 text-sm">{brand}</div>
        <div
          className="w-fit font-medium opacity-80 text-[15px] cursor-pointer hover:opacity-100 "
          onClick={() => navigate(`/products/${category}/${title}/${id}`)}
        >
          {title}
        </div>
        <div className="space-x-[6px]">
          <span className="font-semibold">
            &#8377;{getSellingPrice(amount, discount)}
          </span>
          <span className="line-through font-medium text-[13px] opacity-75">
            &#8377;{amount}
          </span>
          <span className="font-semibold text-sm opacity-80 text-green-700">
            {discount}% Off
          </span>
        </div>

        <div className="space-x-2 mb-3">
          <span className="font-semibold opacity-40 text-[15px]">Size : </span>
          {sizes.map((size, i) => (
            <span key={i} className="font-medium opacity-90 text-[15px]">
              {size}
            </span>
          ))}
        </div>

        {pathname === "/wishlist" &&
          (!stock ? (
            <div className="w-fit text-xs mt-10 border-solid border-rose-300 border-[1px] px-3 py-[6px] rounded-md text-rose-400 font-medium">
              Out of Stock
            </div>
          ) : (
            <ProductBtn
              product={productData}
              productCount={1}
              type="wishlist"
            />
          ))}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  productData: PropTypes.object.isRequired,
};
export default ProductCard;
