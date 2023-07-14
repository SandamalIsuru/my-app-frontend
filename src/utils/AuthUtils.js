import * as Yup from "yup";
import { PASSWORD_POLICY } from "../config/Constants";

export const getPasswordConstraintSchema = (oldPasswordField = "null") => {
  return {
    password: Yup.string()
      .required(PASSWORD_POLICY.REQUIRED_POLICY)
      .min(8, PASSWORD_POLICY.MINIMUM_CHARACTERS_POLICY)
      .minLowercase(1, PASSWORD_POLICY.LOWER_CASE_POLICY)
      .minUppercase(1, PASSWORD_POLICY.UPER_CASE_POLICY)
      .minNumbers(1, PASSWORD_POLICY.NUMBER_POLICY)
      .matches(
        PASSWORD_POLICY.SPECIAL_CHARACTERS_REGEX,
        PASSWORD_POLICY.SPECIAL_CHARACTERS_ERROR
      )
      .notOneOf(
        [Yup.ref(oldPasswordField), null],
        "New password cannot be the same as the old password"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Confirm password must match"),
  };
};

export const mapAuthCodeToMessage = (authCode) => {
  switch (authCode) {
    case "auth/wrong-password":
      return "Your passwords do not match.";
    case "auth/user-not-found":
      return "Your user ID do not match.";
    case "auth/too-many-requests":
      return "Too many requests. Please try again later.";

    // Many more authCode mapping here...

    default:
      return "";
  }
};
