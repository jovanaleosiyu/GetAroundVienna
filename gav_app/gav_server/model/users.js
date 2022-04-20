const { query } = require('../db/index');

module.exports = {
  getUsers: async () => (await query('SELECT * FROM users')).rows,
  getUser: async (userid) => {
    const { rows } = await query(
      'SELECT userid, email FROM users WHERE userid = $1',
      [userid]
    );
    return rows[0];
  },
  getUserEmail: async (email) => {
    const { rows } = await query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return rows[0];
  },
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
  getUserWidgets: async (userid) => {
    const { rows } = await query('SELECT widgets FROM users WHERE userid=$1', [
      userid,
    ]);
    return rows[0];
  },
  updUserWidgets: async (userid, widget) => {
    await query('UPDATE users SET widgets=$2 WHERE userid=$1', [
      userid,
      widget,
    ]);
  },
  updUserDarkMode: async (userid, darkmode) => {
    await query('UPDATE users SET darkmode=$2 WHERE userid=$1', [
      userid,
      darkmode,
    ]);
  },
  updUserColorTheme: async (userid, color) => {
    await query('UPDATE users SET colortheme=$2 WHERE userid=$1', [
      userid,
      color,
    ]);
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
