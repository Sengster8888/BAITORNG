const db = require('../../database/db');

const findById = async (id) => {
  return await db('users')
    .leftJoin('provinces', 'users.province_id', 'provinces.id')
    .select('users.*', 'provinces.name_en as province_name')
    .where('users.id', id)
    .first();
};

const update = async (id, userData) => {
  await db('users').where({ id }).update(userData);
  return await findById(id);
};

module.exports = {
  findById,
  update
};
