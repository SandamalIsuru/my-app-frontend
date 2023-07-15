import Cookies from "js-cookie";
import {
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
      return parseInt(dateSplit[2]);
    case "M":
      return parseInt(dateSplit[1]);
    case "Y":
      return parseInt(dateSplit[0]);
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
    spouseFName: user.maritalStatus === " Married" ? user.spouseFName : "",
    spouseLName: user.maritalStatus === " Married" ? user.spouseLName : "",
    spouseSalutation:
      user.maritalStatus === " Married" ? user.spouseSalutation : "",
    hobbiesAndInterests: user.hobbiesAndInterests,
    favoriteSports: user.favoriteSports,
    preferredMusicgenres: user.preferredMovieOrTVshows,
    preferredMovieOrTVshows: user.preferredMovieOrTVshows,
  };
};
