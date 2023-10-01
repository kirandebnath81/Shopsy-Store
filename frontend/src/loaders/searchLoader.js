import { defer } from "react-router-dom";
import { fetchSearchedProduct } from "../utils";

export const loader = async () => {
  return defer({ data: fetchSearchedProduct() });
};
