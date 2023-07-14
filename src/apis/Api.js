import RANDOM_USER_API from './apiHandlers/RandomUserApi';

const getUsers = async (page, count, gender, nationality) => {
  const params = {
    params: {
      page,
      results: count,
      gender: gender.toLowerCase(),
      nat: nationality,
    },
  }
  let response;
  try {
    response = await RANDOM_USER_API.get(`/`, params);
  } catch (err) {
    throw new Error(err);
  }

  return response.data;
};

export {
  getUsers,
};