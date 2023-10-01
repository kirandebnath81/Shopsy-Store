import PropTypes from "prop-types";
import ProductCard from "../Products/ProductCard";

const BestSell = ({ data }) => {
  return (
    <div>
      <div className="font-medium text-[22px] xs:text-2xl text-center mb-12">
        Best Sell Products
      </div>
      <div className="w-full max-w-[1000px] mx-auto flex flex-wrap justify-center gap-x-7 gap-y-8">
        {data?.map((product) => (
          <ProductCard key={product.id} productData={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSell;

BestSell.propTypes = {
  data: PropTypes.array,
};
