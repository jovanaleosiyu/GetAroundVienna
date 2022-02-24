const { query } = require('../db/index');

module.exports = {
  getUsers: async () => (await query('SELECT * FROM users')).rows,
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
