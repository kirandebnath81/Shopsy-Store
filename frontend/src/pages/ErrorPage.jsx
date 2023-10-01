import { images } from "../constants";
import styles from "../styles";

import { useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.mainBody} flex flex-col sm:flex-row justify-center items-center gap-y-8 sm:gap-x-10 `}
    >
      <div className="w-full max-w-[500px] sm:basis-[45%] ">
        <img src={images.errorImg} alt="pageNotFound" />
      </div>
      <div className="w-full sm:basis-[45%]">
        <div className="text-2xl ss:text-3xl font-bold mb-2">
          We have looked everywhere
        </div>
        <div className="text-xl ss:text-2xl font-semibold mb-7">
          Looks like the page is missing
        </div>
        <button
          className={`${styles.largeButtonFill}`}
          onClick={() => navigate("/")}
        >
          Go to home page
        </button>
      </div>
    </div>
  );
};

Component.displayName = "ErrorPage";
