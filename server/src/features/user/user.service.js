const userModel = require('./user.model');

const getProfile = async (id) => {
  const user = await userModel.findById(id);
  if (!user) throw new Error('User not found');
  delete user.password_hash;
  return user;
};

const updateProfile = async (id, userData) => {
  return await userModel.update(id, userData);
};

module.exports = {
  getProfile,
  updateProfile
};
