import RANDOM_USER_API from "./apiHandlers/RandomUserApi";
import API from "./apiHandlers/NoAuthApi";
import { generateUserRequest } from "../utils/UserUtill";

const getUsers = async (page, count, gender, nationality) => {
  const params = {
    params: {
      page,
      results: count,
      gender: gender.toLowerCase(),
      nat: nationality,
    },
  };
  let response;
  try {
    response = await RANDOM_USER_API.get(`/`, params);
  } catch (err) {
    throw new Error(err);
  }

  return response.data;
};

const getUser = async (id) => {
  let response;
  try {
    response = await API.get(`/users/${id}`);
  } catch (err) {
    throw new Error(err);
  }

  return response.data;
};

const addUser = async (user, id) => {
  const request = generateUserRequest(user);
  request.userId = id;
  let response;
  try {
    response = await API.post(`/users`, request);
  } catch (err) {
    throw new Error(err);
  }

  return response.data;
};

const updateUser = async (user, id) => {
  const request = generateUserRequest(user);
  let response;
  try {
    response = await API.put(`/users/${id}`, request);
  } catch (err) {
    throw new Error(err);
  }

  return response.data;
};

export { getUsers, getUser, addUser, updateUser };
