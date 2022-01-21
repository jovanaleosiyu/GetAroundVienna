const { pool } = require('../db/index');

module.exports = {
  getFavorites: async (userid) => {
    const res = await pool.query(
      `SELECT *
      FROM favorites
              FULL JOIN favpoints USING (favid)
              FULL JOIN favtrips USING (favid)
      WHERE userid = $1;`,
      [userid]
    );
    return res.rows;
  },
  getFavPoints: async (userid) => {
    const res = await pool.query(
      `SELECT *
      FROM favorites
              FULL JOIN favpoints USING (favid)
      WHERE userid = $1;`,
      [userid]
    );
    return res.rows;
  },
  getFavorite: async (favid, userid) => {
    console.log(favid, userid);
    let res = await pool.query(
      `SELECT *
      FROM favpoints
              JOIN favorites USING (favid)
      WHERE favid = $1 AND userid = $2;`,
      [favid, userid]
    );
    if (!res.rows) {
      res = await pool.query(
        `SELECT *
        FROM favtrips
                JOIN favorites USING (favid)
        WHERE favid = $1 AND userid = $2;`,
        [favid, userid]
      );
    }
    return res.rows[0];
  },
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
  addFavTrip: async (
    title,
    icon,
    color,
    origRef,
    origType,
    destRef,
    destType,
    userid,
    options
  ) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const res = await client.query(
        `INSERT INTO favorites (favid, title, icon, color, userid)
        VALUES (default, $1, $2, $3, $4)
        RETURNING favid;`,
        [title, icon, color, userid]
      );
      const { favid } = res.rows[0];
      const { maxChanges, routeType, changeSpeed, excludedMeans } = options;
      await client.query(
        `INSERT INTO favtrips (orig_ref, orig_type, dest_ref, dest_type, maxchanges, routetype, changespeed, exclmeans, favid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
        [
          origRef,
          origType,
          destRef,
          destType,
          maxChanges,
          routeType,
          changeSpeed,
          excludedMeans,
          favid,
        ]
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
  delFavorite: async (userid, favid) => {
    const res = await pool.query(
      `DELETE
      FROM favorites
      WHERE favid = $1
        AND userid = $2
      RETURNING *;`,
      [favid, userid]
    );
    return res.rows[0];
  },
};
