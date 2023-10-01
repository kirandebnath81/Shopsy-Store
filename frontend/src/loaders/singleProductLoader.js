import { defer } from "react-router-dom";
import { fetchProduct, fetchSimilarProduct } from "../utils";

export const loader = async ({ params }) => {
  return defer({
    product: fetchProduct(params.id),
    similarProducts: fetchSimilarProduct(params),
  });
};
