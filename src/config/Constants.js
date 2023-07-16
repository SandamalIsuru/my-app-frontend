/* Password policy constants */
export const PASSWORD_POLICY = {
  REQUIRED_POLICY: "Password is required",
  MINIMUM_CHARACTERS_POLICY: "Password must be 8 characters at minimum",
  UPER_CASE_POLICY: "Password must contain at least 1 upper case letter",
  LOWER_CASE_POLICY: "Password must contain at least 1 lower case letter",
  NUMBER_POLICY: "Password must contain at least 1 number",
  SPECIAL_CHARACTERS_POLICY:
    "Password must contain at least 1 of these special characters",
  SPECIAL_CHARACTERS_ERROR:
    "Password must contain at least 1 special character",
  SPECIAL_CHARACTERS: "@$!%*$?&",
  SPECIAL_CHARACTERS_REGEX: /[`@$!%*$?&`]+/,
};

export const MOBILE_NUMBER_REG_EXP = /^\d{10}$/;

export const NATIONALITY = [
  { label: "US", value: 1 },
  { label: "AU", value: 2 },
  { label: "BR", value: 3 },
  { label: "CA", value: 4 },
  { label: "CH", value: 5 },
  { label: "DE", value: 6 },
  { label: "DK", value: 7 },
  { label: "ES", value: 8 },
  { label: "FI", value: 9 },
  { label: "FR", value: 10 },
  { label: "GB", value: 11 },
  { label: "IE", value: 12 },
  { label: "BR", value: 13 },
  { label: "IR", value: 14 },
  { label: "MX", value: 15 },
  { label: "NL", value: 16 },
  { label: "NO", value: 17 },
  { label: "NZ", value: 18 },
  { label: "RS", value: 19 },
  { label: "TR", value: 20 },
  { label: "UA", value: 21 },
];

export const USER = "USER";

export const USER_ATTRIBUTES = {
  EMAIL: "EMAIL",
  USER_ID: "USER_ID",
};

export const USER_AUTH = "USER_AUTH";

export const USER_AUTH_ATTRIBUTES = {
  ID_TOKEN: "ID_TOKEN",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
};

export const SALUTATIONS = [
  {
    label: "Mr",
    value: "Mr",
  },
  {
    label: "Ms",
    value: "Ms",
  },
  {
    label: "Mrs",
    value: "Mrs",
  },
];

export const MARRIED = "Married";
export const SINGLE = "Single";


export const MARITAL_STATUS = [
  {
    label: SINGLE,
    value: SINGLE,
  },
  {
    label: MARRIED,
    value: MARRIED,
  },
];

export const GENDER = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
];

export const myProfileTabs = [
  "Basic Details",
  "Additional Details",
  "Spouse Details",
  "Personal Preferences",
];