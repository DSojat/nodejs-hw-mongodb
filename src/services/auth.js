import UsersModel from '../db/models/User.js';

export const registerUser = async payload => {
  return await UsersModel.create(payload);
};
