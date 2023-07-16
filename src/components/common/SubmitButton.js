import classNames from "classnames";
import React from "react";

const SubmitButton = ({ className, label, disabled = false }) => {
  return (
    <button
      type="submit"
      className={classNames(
        className,
        "py-3 font-semibold"
      )}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
