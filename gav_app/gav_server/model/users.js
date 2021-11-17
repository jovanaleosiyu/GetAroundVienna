const { query } = require('../db/index');

const getUsers = async () => (await query('SELECT * FROM users')).rows;

const addUser = async (email, password) => {
  const res = await query(
    `
      INSERT INTO users
      VALUES (default, $1, $2)
      RETURNING *
    `,
    [email, password]
  );
  return res.rows[0];
};
module.exports = {
  getUsers,
  addUser,
};
