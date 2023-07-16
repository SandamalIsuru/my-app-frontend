import classNames from "classnames";
import { ErrorMessage, Field } from "formik";
import React from "react";
import FormikDropdown from "./FormikDropdown";

const ValidatedDropdown = ({
  className,
  fieldName,
  placeholder,
  options = [],
  defaultValue = null,
  isDisabled = false,
  handleChange = () => {},
}) => {
  return (
    <div className={classNames("flex flex-col w-full", className)}>
      <div>
        <Field
          className={classNames("w-full", className)}
          name={fieldName}
          id={fieldName}
          placeholder={placeholder}
          options={options}
        >
          {({ field, form }) => (
            <FormikDropdown
              className={"mt-[5px]"}
              form={form}
              field={field}
              placeholder={placeholder}
              options={options}
              defaultValue={defaultValue}
              isDisabled={isDisabled}
              isError={form.touched[field.name] && form.errors[field.name]}
              handleChange={handleChange}
            />
          )}
        </Field>
        <div className="h-4 w-full">
          <ErrorMessage
            component="div"
            name={fieldName}
            className=" text-errorRed text-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ValidatedDropdown;
