import PropTypes from "prop-types";

import { useSearchParams } from "react-router-dom";

const FilterInput = ({ details, type }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { name, id, label } = details;

  //handle input change
  const changeHandler = (e) => {
    const { name, checked } = e.target;

    let selectedParams = [...searchParams.getAll(type)];

    if (checked) {
      selectedParams.push(name);
    } else {
      selectedParams = selectedParams.filter((param) => param !== name);
    }

    setSearchParams((prevParams) => {
      prevParams.delete(type);
      for (let selectedParam of selectedParams) {
        prevParams.append(type, selectedParam);
      }
      return prevParams;
    });
  };

  return (
    <div key={id} className="flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={searchParams.getAll(type).includes(name)}
        onChange={changeHandler}
        id={id}
        className="mr-2 w-3 sm:w-4 h-3 sm:h-4 cursor-pointer"
      />
      <label
        htmlFor={id}
        className="text-[13px] sm:text-[15px] font-normal sm:font-medium opacity-100 sm:opacity-90 cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};

FilterInput.propTypes = {
  details: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default FilterInput;
