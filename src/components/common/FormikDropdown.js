import React from "react";
import classNames from "classnames";
import Select from "react-select";

const FormikDropdown = ({
  className,
  field,
  form,
  options,
  placeholder = "Select",
  defaultValue = null,
  isDisabled = false,
  isError = false,
  handleChange = () => {},
}) => {
  const customStyles = {
    container: (base) => ({
      borderWidth: 2,
      borderColor: isError ? "var(--theme-error-red)" : "",
      ...base,
      backgroundColor: "transparent",
      borderRadius: 0,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "transparent",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: isDisabled ? "var(--theme-disable-text-color)" : "",
      marginRight: 4,
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      borderWidth: 0,
      borderRadius: 0,
      backgroundColor: "transparent",
      marginTop: "3px",
      boxShadow: "none",
      paddingLeft: 10,
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      borderWidth: 0,
      backgroundColor: "transparent",
      marginLeft: 5,
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "var(--theme-dropdown-gray)",
      paddingLeft: 4,
      paddingRight: 4,
      borderRadius: 8,
    }),
    option: (base, state) => ({
      ...base,
      color: state.isFocused
        ? "var(--theme-white-smoke)"
        : "var(--theme-text-gray)",
      cursor: "pointer",
      backgroundColor: state.isFocused && "var(--theme-hover-background)",
      borderRadius: 4,
      height: 32,
      fontSize: 12,
    }),
  };

  return (
    <Select
      className={classNames(
        className,
        `rounded-lg h-12 border-2 text-[14px] ${
          isError ? "border-errorRed" : "border-hoverBackground"
        }`
      )}
      styles={customStyles}
      options={options}
      name={field.name}
      value={
        options ? options.find((option) => option.value === field.value) : ""
      }
      onChange={(option) => {
        form.setFieldValue(field.name, option.value);
        handleChange(option);
      }}
      placeholder={placeholder}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
      onBlur={() => {
        const touched = { ...form.touched };
        touched[field.name] = true;
        form.setTouched(touched);
      }}
    />
  );
};

export default FormikDropdown;
