import { useContext } from "react";
import styles from "../styles";
import { UserContext } from "../contexts";
import { EmptyProductsList, ProductCard } from "../components";

export const Component = () => {
  const { userDetails } = useContext(UserContext);
  const { wishlist } = userDetails;

  if (wishlist.length === 0) {
    return (
      <div className="text-center pt-5">
        <EmptyProductsList message="Your Products wishlist is Empty" />
      </div>
    );
  }

  return (
    <div className={styles.mainBody}>
      <div>
        <div className="mb-10 text-xl ss:text-2xl font-medium text-center">
          Shopping List
        </div>
        <div className="w-full flex flex-wrap justify-center gap-x-6  xs:gap-x-9 gap-y-8">
          {userDetails.wishlist.map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

Component.diplayName = "Wishlist";
