import classNames from "classnames";
import React from "react";
import Select from "react-select";

const Dropdown = ({ className, styles = {}, options, value, onChange }) => {
  const customStyles = {
    container: (base) => ({
      ...base,
      backgroundColor: 'transparent',
      borderColor: 'var(--theme-divider-color)',
      borderWidth: 2,
      ...styles.container,
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: "transparent",
      ...styles.dropdownIndicator,
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      borderWidth: 0,
      backgroundColor: 'var(--theme-dropdown-gray)',
      boxShadow: 'none',
      borderRadius: 0,
      ...styles.control,
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: 'var(--theme-dropdown-gray)',
      paddingLeft: 4,
      paddingRight: 4,
      borderRadius: 8,
      ...styles.menu,
    }),
    option: (base, state) => ({
      ...base,
      color: state.isFocused ? 'var(--theme-white-smoke)' : 'var(--theme-text-gray)',
      cursor: 'pointer',
      backgroundColor: state.isFocused && 'var(--theme-hover-background)',
      borderRadius: 4,
      height: 32,
      fontSize: 12,
      ...styles.option,
    }),
  };

  return (
    <Select
      className={classNames(className, ``)}
      options={options}
      styles={customStyles}
      value={value}
      onChange={(value) => {
        onChange(value);
      }}
      placeholder="Select a fruit"
    />
  );
};

export default Dropdown;
