import { defer } from "react-router-dom";
import { fetchBestSellProducts } from "../utils";

const homeLoader = async () => {
  return defer({ products: fetchBestSellProducts() });
};

export default homeLoader;
