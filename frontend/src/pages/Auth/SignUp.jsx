import { useState } from "react";

import styles from "../../styles";
import { db, icons } from "../../constants";

import { useForm } from "react-hook-form";

import ClipLoader from "react-spinners/ClipLoader";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { auth } from "../../constants";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { InputErrorMsg } from "../../components";

export const Component = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //submit form handler
  const onSubmit = async (data) => {
    const { fullName, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setIsError(true);
      setErrorMsg("Password does not match");
      return;
    }
    setIsError(false);
    setIsLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      navigate(state ? state : "/", { replace: true });

      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        uid: user.uid,
        email: user.email,
        name: fullName,
      });
    } catch (error) {
      setIsError(true);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${styles.mainBody} flex flex-col items-center mt-2`}>
      <div className="w-full xs:w-[90%] h-auto max-w-[450px] px-[15px] ss:px-7 xs:px-10 py-8 rounded-xl bg-white flex flex-col items-center shadow-formShadow">
        <div className="text-lg ss:text-xl xs:text-2xl font-medium mb-7 text-slate-700">
          Create Your Account
        </div>

        {isError && (
          <div className="w-full border-[1px] border-solid border-red-500  mb-6 py-2 rounded-lg text-center text-red-500 font-light">
            {errorMsg}
          </div>
        )}

        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Name"
              {...register("fullName", {
                required: "Name is required",
              })}
              className={`${styles.inputField} ${
                errors?.fullName ? styles.errorInput : styles.correctInput
              }`}
            />
            {/*error msg*/}
            {errors?.fullName && (
              <InputErrorMsg message={errors?.fullName?.message} />
            )}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail.com$/,
                  message: "Please enter a valid Gmail",
                },
              })}
              className={`${styles.inputField} ${
                errors?.email ? styles.errorInput : styles.correctInput
              }`}
            />
            {/*error msg*/}
            {errors?.email && (
              <InputErrorMsg message={errors?.email?.message} />
            )}
          </div>

          <div className="relative ">
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

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                minLength: { value: 6, message: "Min 6 characters required" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: "Must contain uppercase, lowercaser and 1 num",
                },
              })}
              className={`${styles.inputField} ${
                errors?.confirmPassword
                  ? styles.errorInput
                  : styles.correctInput
              }`}
            />
            {/*error msg*/}
            {errors?.confirmPassword && (
              <InputErrorMsg message={errors?.confirmPassword?.message} />
            )}

            {/*toggle password view button*/}
            {showConfirmPassword ? (
              <div
                onClick={() => setShowConfirmPassword(false)}
                className={`${styles.PasswrodInputEye}`}
              >
                <icons.eyeInvisible />
              </div>
            ) : (
              <div
                onClick={() => setShowConfirmPassword(true)}
                className={`${styles.PasswrodInputEye}`}
              >
                <icons.eye />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`w-full h-9 ss:h-10 rounded-md flex items-center justify-center bg-slate-200 text-sm ss:text-base hover:bg-slate-300 active:bg-slate-200 transition-colors duration-300 ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            {isLoading ? <ClipLoader color="#2779bd" size={28} /> : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-sm ss:text-base">
          Already have an account?{" "}
          <Link to={"/signin"} state={state}>
            <span className="text-sm ss:text-base text-blue-700 font-medium hover:underline">
              Sign In
            </span>{" "}
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

Component.displayName = "SignUp";
