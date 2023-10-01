import { useEffect, useRef } from "react";

const useOutsideClick = (handler) => {
  const nodeRef = useRef();

  useEffect(() => {
    const handleMousedown = (event) => {
      if (nodeRef.current && !nodeRef.current.contains(event.target)) {
        handler();
      }
    };

    window.addEventListener("mousedown", handleMousedown);

    return () => {
      window.removeEventListener("mousedown", handleMousedown);
    };
  });

  return nodeRef;
};

export default useOutsideClick;
