import { useContext } from "react";
import styles from "../../styles";

import { v4 } from "uuid";

import { auth, icons } from "../../constants";

import { useForm } from "react-hook-form";

import useOutsideClick from "../../custom-hooks/OutsideClick";
import { ModalContext, UserContext } from "../../contexts";

import { addAddresses, editAddress } from "../../utils";
import InputErrorMsg from "../InputErrorMsg";
import { useAuthState } from "react-firebase-hooks/auth";

const inputFields = [
  { name: "fullName", title: "Full Name", id: v4() },
  { name: "country", title: "Country", id: v4() },
  { name: "state", title: "State", id: v4() },
  { name: "city", title: "City", id: v4() },
  { name: "area", title: "Flat, House No, Area, Street", id: v4() },
];

const CreateAddressModal = () => {
  const { setIsCreateAddressModal } = useContext(ModalContext);
  const [user] = useAuthState(auth);
  const { userDetails } = useContext(UserContext);
  const { addresses, editedAddress } = userDetails;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: editedAddress || {
      fullName: "",
      country: "",
      state: "",
      city: "",
      area: "",
      pincode: "",
      mobileNo: "",
    },
  });

  const nodeRef = useOutsideClick(() => setIsCreateAddressModal(false));

  const onSubmit = (data) => {
    if (editedAddress) {
      editAddress(user.uid, addresses, { ...editedAddress, ...data });
    } else {
      addAddresses(user.uid, [{ ...data, id: v4() }, ...addresses]);
    }
    setIsCreateAddressModal(false);
  };

  const handleSetValues = () => {
    const valuesToSet = {
      fullName: "Kiran Debnath",
      country: "India",
      state: "Assam",
      city: "Guwahati",
      area: "#100ft Ring Road, Jp Nagar - 4 Phase, Chatribari",
      pincode: "781003",
      mobileNo: "9120995324",
    };

    for (let key in valuesToSet) {
      setValue(key, valuesToSet[key]);
    }
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 z-50 bg-slate-900 bg-opacity-70 flex justify-center items-center py-16">
      <div
        className="w-[95%] max-w-[550px] max-h-[90vh] overflow-y-auto rounded-lg bg-white pt-4 px-4 pb-5 ss:pt-5 ss:px-6 ss:pb-6  font-montserrat scrollbar"
        ref={nodeRef}
      >
        <div className="flex justify-between items-start mb-7">
          <div className="flex-1 text-base ss:text-lg font-semibold opacity-80">
            Enter a new delivery address
          </div>
          <div
            className={`basis-6 ${styles.closeBtn}`}
            onClick={() => setIsCreateAddressModal(false)}
          >
            <icons.cross />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-4">
              {inputFields.map(({ name, title, id }) => (
                <div key={id}>
                  <input
                    type="text"
                    {...register(name, { required: "This field is required" })}
                    placeholder={title}
                    className={`h-8 ss:h-9 ${styles.inputField} ${
                      errors[name] ? styles.errorInput : styles.correctInput
                    } `}
                  />
                  {/* input error message */}
                  {errors[name] && (
                    <InputErrorMsg message={errors[name]?.message} />
                  )}
                </div>
              ))}
            </div>

            <div>
              <input
                type="number"
                {...register("pincode", {
                  required: "This field is required",
                  minLength: { value: 6, message: "Enter a valid Pincode" },
                })}
                placeholder="Pincode"
                className={`h-8 ss:h-9 appearance-none ${styles.inputField} ${
                  errors.pincode ? styles.errorInput : styles.correctInput
                } `}
              />
              {/* input error message */}
              {errors.pincode && (
                <InputErrorMsg message={errors?.pincode?.message} />
              )}
            </div>
            <div>
              <input
                type="number"
                {...register("mobileNo", {
                  required: "This field is required",
                  minLength: { value: 10, message: "Enter a valid mobile no" },
                })}
                placeholder="Mobile number"
                className={`h-8 ss:h-9 ${styles.inputField} ${
                  errors.mobileNo ? styles.errorInput : styles.correctInput
                } `}
              />
              {/* input error message */}
              {errors.mobileNo && (
                <InputErrorMsg message={errors?.mobileNo?.message} />
              )}
            </div>
          </div>

          <div className="flex space-x-3 mt-5">
            <button className="px-4 ss:px-5 py-[6px] text-white text-xs ss:text-sm font-medium bg-rose-500 rounded-[5px] hover:bg-rose-600 active:bg-rose-500 transition-colors duration-300">
              {editedAddress ? "Save" : "Submit"}
            </button>
            {!editedAddress && (
              <div
                className="px-3 ss:px-4 py-[6px] text-rose-500 text-xs ss:text-sm font-medium cursor-pointer border-rose-500 border-solid border-[1px]
             rounded-[5px] hover:bg-rose-500 
             hover:text-white
             active:bg-rose-600 transition-colors duration-300"
                onClick={handleSetValues}
              >
                Dummy Address
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAddressModal;
