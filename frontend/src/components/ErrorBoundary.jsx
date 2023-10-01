import { useRouteError } from "react-router-dom";
import styles from "../styles";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div
      className={`${styles.mainBody} mt-[70px] py-14 flex flex-col items-center space-y-8`}
    >
      <div className="text-3xl font-semibold">An Error has occured</div>
      <div className="text-2xl font-semibold">
        {error.message ? error.message : error}
      </div>
    </div>
  );
};

export default ErrorBoundary;
