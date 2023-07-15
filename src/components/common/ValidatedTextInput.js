import { ErrorMessage, Field } from "formik";
import React from "react";
import TextInput from "./TextInput";
import classNames from "classnames";

const ValidatedTextInput = ({
  className,
  fieldName,
  placeholder,
  isEditable = true,
}) => {
  return (
    <div className={classNames("flex flex-col mx w-full", className)}>
      <div>
        <Field name={fieldName}>
          {({ field, form: { touched, errors } }) => (
            <TextInput
              className={"mt-1"}
              placeholder={placeholder}
              field={field}
              touched={touched[field.name]}
              error={touched[field.name] && errors[field.name]}
              isEditable={isEditable}
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

export default ValidatedTextInput;
