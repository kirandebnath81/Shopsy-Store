import { useState } from "react";

import styles from "../../styles";
import { icons, testUsers } from "../../constants";

import ClipLoader from "react-spinners/ClipLoader";

import { useForm } from "react-hook-form";

import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../constants";

import { InputErrorMsg } from "../../components";

export const Component = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");

  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState({ user: false, guest: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsError(false);

    email.includes("testuser") &&
    password.includes("A") &&
    password.endsWith("a")
      ? setIsLoading((prev) => ({ ...prev, guest: true }))
      : setIsLoading((prev) => ({ ...prev, user: true }));

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(state ? state : "/", { replace: true });
    } catch (error) {
      setIsError(true);
      setErrorMsg(error.message);
    } finally {
      setIsLoading({ user: false, guest: false });
    }
  };

  return (
    <div className={`${styles.mainBody} flex flex-col items-center mt-3`}>
      {message && (
        <div className="text-lg ss:text-xl font-medium mb-5 text-red-500">
          {message}
        </div>
      )}
      <div className="w-full xs:w-[90%] h-auto max-w-[450px] px-[15px] ss:px-7 xs:px-10 py-10 rounded-xl bg-white flex flex-col items-center shadow-formShadow">
        <div className="text-lg ss:text-xl xs:text-2xl font-medium mb-8 text-slate-700">
          Sign In To Your Account
        </div>
        {/*error msg*/}
        {isError && (
          <div className="w-full border-[1px] border-solid border-red-500 dark:border-red-600 mb-6 py-2 rounded-lg text-center text-red-500 dark:text-red-500">
            {errorMsg}
          </div>
        )}

        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail.com$/,
                  message: "Please enter a valid Gmail ",
                },
              })}
              className={`${styles.inputField} ${
                errors?.email ? styles.errorInput : styles.correctInput
              }`}
            />
            {/*input error msg*/}
            {errors?.email && (
              <InputErrorMsg message={errors?.email?.message} />
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Must contain uppercase, lowercaser and numbers",
                },
              })}
              className={`${styles.inputField} ${
                errors?.password ? styles.errorInput : styles.correctInput
              }`}
            />
            {/*error msg*/}
            {errors?.password && (
              <InputErrorMsg message={errors?.password?.message} />
            )}

            {/*toggle password view button*/}
            {showPassword ? (
              <div
                onClick={() => setShowPassword(false)}
                className={`${styles.PasswrodInputEye}`}
              >
                <icons.eyeInvisible />
              </div>
            ) : (
              <div
                onClick={() => setShowPassword(true)}
                className={`${styles.PasswrodInputEye}`}
              >
                <icons.eye />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-9 ss:h-10 rounded-md flex items-center justify-center bg-slate-200  text-sm ss:text-base hover:bg-slate-300 active:bg-slate-200 transition-colors duration-300"
          >
            {isLoading.user ? (
              <ClipLoader color="#2779bd" size={28} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <div
          className="flex justify-center items-center space-x-3 mt-8 mb-6"
          onClick={() => onSubmit(testUsers[Math.round(Math.random() * 10)])}
        >
          <div className="text-[15px] ss:text-[17px] font-medium cursor-pointer text-blue-700 hover:text-blue-800 active:text-blue-700 transition-colors duration-300">
            Continue as Guest
          </div>
          {isLoading.guest && <ClipLoader color="#2779bd" size={25} />}
        </div>

        <div className="text-sm ss:text-base ">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"} state={state}>
            <span className="text-sm ss:text-base text-blue-700 font-medium hover:underline">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

Component.displayName = "SignIn";
