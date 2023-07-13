/* Password policy constants */
export const PASSWORD_POLICY = {
  REQUIRED_POLICY: 'Password is required',
  MINIMUM_CHARACTERS_POLICY: 'Password must be 8 characters at minimum',
  UPER_CASE_POLICY: 'Password must contain at least 1 upper case letter',
  LOWER_CASE_POLICY: 'Password must contain at least 1 lower case letter',
  NUMBER_POLICY: 'Password must contain at least 1 number',
  SPECIAL_CHARACTERS_POLICY: 'Password must contain at least 1 of these special characters',
  SPECIAL_CHARACTERS_ERROR: 'Password must contain at least 1 special character',
  SPECIAL_CHARACTERS: '@$!%*$?&',
  SPECIAL_CHARACTERS_REGEX: /[`@$!%*$?&`]+/,
};