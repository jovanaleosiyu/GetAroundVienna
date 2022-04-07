const { query } = require('../db/index');

module.exports = {
  getUsers: async () => (await query('SELECT * FROM users')).rows,
  getUser: async (userid) => (await query('SELECT userid, email FROM users WHERE userid = $1', [userid])).rows[0],
  getUserEmail: async (email) => (await query('SELECT * FROM users WHERE email = $1', [email])).rows[0],
  getUserSettings: async (userid) => {
    const res = await query(
      `
      SELECT userid, colortheme, darkmode, exclmeans, changespeed, routetype, maxchanges
      FROM users
      WHERE userid = $1;
    `,
      [userid]
    );
    return res.rows[0];
  },
  addUser: async (email, password) => {
    const res = await query(
      `
      INSERT INTO users
      VALUES (default, $1, $2)
      RETURNING *
    `,
      [email, password]
    );
    return res.rows[0];
  },
};
