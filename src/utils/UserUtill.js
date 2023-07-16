import Cookies from "js-cookie";
import {
  MARRIED,
  USER,
  USER_ATTRIBUTES,
  USER_AUTH,
  USER_AUTH_ATTRIBUTES,
} from "../config/Constants";

export const setUserAuthInLocalStorage = (authResult) => {
  let auth = {
    ACCESS_TOKEN: authResult.accessToken,
  };
  if (authResult.refreshToken) auth.REFRESH_TOKEN = authResult.refreshToken;
  else
    auth.REFRESH_TOKEN = getUserAuthAttributeFromLocalStorage(
      USER_AUTH_ATTRIBUTES.REFRESH_TOKEN
    );
  localStorage.setItem(USER_AUTH, JSON.stringify(auth));
};

export const getUserAuthAttributeFromLocalStorage = (attributeName) => {
  const userAuth = localStorage.getItem(USER_AUTH);
  if (JSON.parse(userAuth)) {
    switch (attributeName) {
      case USER_AUTH_ATTRIBUTES.ACCESS_TOKEN:
        return JSON.parse(userAuth).ACCESS_TOKEN;
      case USER_AUTH_ATTRIBUTES.REFRESH_TOKEN:
        return JSON.parse(userAuth).REFRESH_TOKEN;
      default:
        return null;
    }
  }
  return null;
};

export const setUserInLocalStorage = (result) => {
  const user = {
    USER_ID: result.uid,
    EMAIL: result.email,
  };
  localStorage.setItem(USER, JSON.stringify(user));
};

export const getUserAttributeFromLocalStorage = (attributeName) => {
  const user = localStorage.getItem(USER);
  if (user) {
    switch (attributeName) {
      case USER_ATTRIBUTES.EMAIL:
        return JSON.parse(user).EMAIL;
      case USER_ATTRIBUTES.USER_ID:
        return JSON.parse(user).USER_ID;
      default:
        return null;
    }
  }
  return null;
};

export const clearLocalStorage = () => {
  localStorage.setItem(USER_AUTH, null);
  localStorage.setItem(USER, null);
  setKeepLoggedInInBrowserCookies(false);
};

export const setKeepLoggedInInBrowserCookies = (keepLoggedIn) => {
  if (keepLoggedIn) {
    // Set the "Keep me logged in" cookie to true
    Cookies.set("keepLoggedIn", true, { expires: 365 }); // Expires in 1 year
  } else {
    // Remove the "Keep me logged in" cookie
    Cookies.remove("keepLoggedIn");
  }
};

export const getKeepLoggedInInBrowserCookies = () => {
  return Cookies.get("keepLoggedIn");
};

export const getValueFromDate = (dateStr, requireValue) => {
  var dateSplit = dateStr.split("-");
  switch (requireValue) {
    case "D":
      return dateSplit[2];
    case "M":
      return dateSplit[1];
    case "Y":
      return dateSplit[0];
    default:
      return null;
  }
};

export const generateUserRequest = (user) => {
  return {
    fname: user.firstName,
    lname: user.lastName,
    salutation: user.salutation,
    email: user.email,
    avatar: user.avatar,
    mobile: user.mobileNo,
    address: user.address,
    country: user.country,
    postalCode: user.postalCode,
    nationality: user.nationality,
    dob:
      user.birthYear && user.birthMonth && user.birthDate
        ? `${user.birthYear}-${user.birthMonth}-${user.birthDate}`
        : "",
    gender: user.gender,
    maritalStatus: user.maritalStatus,
    spouseFName: user.maritalStatus === MARRIED ? user.spouseFName : "",
    spouseLName: user.maritalStatus === MARRIED ? user.spouseLName : "",
    spouseSalutation:
      user.maritalStatus === MARRIED ? user.spouseSalutation : "",
    hobbiesAndInterests: user.hobbiesAndInterests,
    favoriteSports: user.favoriteSports,
    preferredMusicgenres: user.preferredMovieOrTVshows,
    preferredMovieOrTVshows: user.preferredMovieOrTVshows,
  };
};

export const getFormikInitialUserSchema = (user) => {
  return {
    salutation: user.salutation ? user.salutation : "",
    firstName: user.fname ? user.fname : "",
    lastName: user.lname ? user.lname : "",
    email: user.email ? user.email : "",
    mobileNo: user.mobile ? user.mobile : "",
    address: user.address ? user.address : "",
    country: user.country ? user.country : "",
    postalCode: user.postalCode ? user.postalCode : "",
    nationality: user.nationality ? user.nationality : "",
    birthDate: user.dob ? getValueFromDate(user.dob, "D") : "",
    birthMonth: user.dob ? getValueFromDate(user.dob, "M") : "",
    birthYear: user.dob ? getValueFromDate(user.dob, "Y") : "",
    gender: user.gender ? user.gender : "",
    maritalStatus: user.maritalStatus ? user.maritalStatus : "",
    spouseSalutation: user.spouseSalutation
      ? user.spouseSalutation
      : "",
    spouseFName: user.spouseFName ? user.spouseFName : "",
    spouseLName: user.spouseLName ? user.spouseLName : "",
    hobbiesAndInterests: user.hobbiesAndInterests
      ? user.hobbiesAndInterests
      : "",
    favoriteSports: user.favoriteSports
      ? user.favoriteSports
      : "",
    preferredMusicgenres: user.preferredMusicgenres
      ? user.preferredMusicgenres
      : "",
    preferredMovieOrTVshows: user.preferredMovieOrTVshows
      ? user.preferredMovieOrTVshows
      : "",
  }
}

export const getBirthYears = (startYear = 1900) => {
  let currentYear = new Date().getFullYear() - 17,
    years = [];
  while (startYear < currentYear) {
    years.push({ value: startYear + 1, label: startYear + 1 });
    startYear++;
  }
  return years;
};
