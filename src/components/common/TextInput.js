import classNames from "classnames";
import React from "react";

const TextInput = ({
  className,
  type = "text",
  placeholder,
  defaultValue,
  field,
  error,
  value,
  id = "",
  isEditable = true,
  inputClassName = {},
  onPaste = () => {},
}) => {
  return (
    <div
      className={classNames(
        `flex flex-row items-center justify-center h-12 border-2 text-[14px] ${
          error ? "border-errorRed" : "border-hoverBackground"
        }`,
        className
      )}
    >
      <input
        {...field}
        type={type}
        className={classNames(
          inputClassName,
          "bg-transparent w-11/12 h-full focus:outline-none text-[14px]"
        )}
        placeholder={placeholder}
        value={field ? field.value : value}
        defaultValue={defaultValue}
        readOnly={!isEditable}
        id={id}
        onPaste={(e) => onPaste(e.clipboardData.getData("Text"))}
      />
    </div>
  );
};

export default TextInput;
