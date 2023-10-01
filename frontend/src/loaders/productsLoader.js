import { defer } from "react-router-dom";
import { fetchProducts } from "../utils";

export const loader = async () => {
  return defer({ products: fetchProducts() });
};
