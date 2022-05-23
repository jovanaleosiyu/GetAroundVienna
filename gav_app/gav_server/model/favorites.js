const { getClient, query } = require('../db/index');

module.exports = {
  getFavorites: async (userid) => {
    const res = await query(
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
    const res = await query(
      `SELECT *
      FROM favpoints
              JOIN favorites USING (favid)
      WHERE userid = $1;`,
      [userid]
    );
    return res.rows;
  },
  getFavTrips: async (userid) => {
    const res = await query(
      `SELECT *
      FROM favtrips
              JOIN favorites USING (favid)
      WHERE userid = $1;`,
      [userid]
    );
    return res.rows;
  },
  getFavorite: async (favid, userid) => {
    let res = await query(
      `SELECT *
      FROM favpoints
              JOIN favorites USING (favid)
      WHERE favid = $1 AND userid = $2;`,
      [favid, userid]
    );
    if (!res.rows.length) {
      res = await query(
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
    const client = await getClient();
    try {
      await client.query('BEGIN');
      const res = await client.query(
        `INSERT INTO favorites (title, icon, color, userid)
        VALUES ($1, $2, $3, $4)
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
    const client = await getClient();
    try {
      await client.query('BEGIN');
      const res = await client.query(
        `INSERT INTO favorites (title, icon, color, userid)
        VALUES ($1, $2, $3, $4)
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
    const res = await query(
      `DELETE
      FROM favorites
      WHERE favid = $1
        AND userid = $2
      RETURNING *;`,
      [favid, userid]
    );
    return res.rows[0];
  },
  updFavPoint: async (userid, favid, data) => {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      await client.query(
        `UPDATE favorites
          SET color=$1,
              icon=$2,
              title=$3
          WHERE favid = $4 AND userid = $5;`,
        [data.color, data.icon, data.title, favid, userid]
      );
      await client.query(
        `UPDATE favpoints
          SET ref=$1,
              type=$2
          WHERE favid = $3;`,
        [data.ref, data.type, favid]
      );
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },
  updFavTrip: async (userid, favid, data) => {
    const client = await getClient();
    try {
      await client.query('BEGIN');
      await client.query(
        `UPDATE favorites
          SET color=$1,
              icon=$2,
              title=$3
          WHERE favid = $4 AND userid = $5;`,
        [data.color, data.icon, data.title, favid, userid]
      );
      await client.query(
        `UPDATE favtrips
          SET orig_ref = $1,
              orig_type = $2,
              dest_ref = $3,
              dest_type = $4,
              exclmeans = $5,
              changespeed = $6,
              routetype = $7,
              maxchanges = $8
          WHERE favid = $9;`,
        [
          data.origRef,
          data.origType,
          data.destRef,
          data.destType,
          data.exclMeans,
          data.changeSpeed,
          data.routeType,
          data.maxChanges,
          favid,
        ]
      );
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  },
};
