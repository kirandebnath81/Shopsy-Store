import PropTypes from "prop-types";
import styles from "../styles";
import { useNavigate } from "react-router-dom";

const EmptyProductsList = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div className="font-montserrat">
      <div className="text-lg ss:text-xl sm:text-[22px]  font-medium">
        {message}
      </div>
      <button
        className={`${styles.buttonOutline} text-[15px] sm:text-base mt-5`}
        onClick={() => navigate("/products")}
      >
        Explore Products
      </button>
    </div>
  );
};

EmptyProductsList.propTypes = {
  message: PropTypes.string.isRequired,
};

export default EmptyProductsList;
