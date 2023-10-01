import { useNavigate } from "react-router-dom";
import styles from "../../styles";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[380px] sm:h-[420px] md:h-[480px] bg-custom-banner bg-center bg-cover rounded-xl text-white flex flex-col justify-center pl-5 xs:pl-12 ">
      <div className="w-[70%] ss:w-full text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5">
        Wear the Best.
      </div>

      <div className="w-[70%] ss:w-full font-medium text-base xs:text-lg sm:text-xl md:text-[22px] mb-10">
        <div className="sm:mb-1">Super Value Deals </div>
        <div>
          Upto{" "}
          <span className="text-lg xs:text-xl md:text-2xl font-extrabold">
            55% OFF
          </span>{" "}
          on various prducts
        </div>
      </div>

      <button
        className={`${styles.largeButtonFill}`}
        onClick={() => navigate("/products")}
      >
        Shop Now
      </button>
    </div>
  );
};

export default Banner;
