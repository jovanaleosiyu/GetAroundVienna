const { pool } = require('../db/index');

module.exports = {
  addFavPoint: async (title, icon, color, ref, type, userid) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const res = await client.query(
        `INSERT INTO favorites (favid, title, icon, color, userid)
        VALUES (default, $1, $2, $3, $4)
        RETURNING favid`,
        [title, icon, color, userid]
      );
      const { favid } = res.rows[0];
      await client.query(
        `INSERT INTO favpoints (ref, type, favid)
        VALUES ($1, $2, $3);`,
        [ref, type, favid]
      );
      await client.query('COMMIT');
      return favid;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },
};
