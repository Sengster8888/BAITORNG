const db = require('../../database/db');

const findUserByEmail = async (email) => {
  return await db('users').where({ email }).first();
};

const findUserByPhone = async (phone) => {
  return await db('users').where({ phone }).first();
};

const findUserById = async (id) => {
  return await db('users').where({ id }).first();
};

const findUserByResetToken = async (token) => {
  return await db('users')
    .where('reset_password_token', token)
    .where('reset_password_expires', '>', new Date())
    .first();
};

const saveUser = async (userData) => {
  const [user] = await db('users').insert(userData).returning('*');
  return user;
};

const updateUser = async (id, userData) => {
  const [user] = await db('users').where({ id }).update(userData).returning('*');
  return user;
};

module.exports = {
  findUserByEmail,
  findUserByPhone,
  findUserById,
  findUserByResetToken,
  saveUser,
  updateUser
};