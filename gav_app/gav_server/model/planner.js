const { query } = require('../db/index');

module.exports = {
  getPlannerEntries: async (userid) => {
    const res = await query(
      `
      SELECT *
        FROM plannerentries
        WHERE userid = $1;
      `,
      [userid]
    );
    return res.rows;
  },
  getPlannerEntry: async (userid, planid) => {
    const res = await query(
      `
      SELECT *
        FROM plannerentries
        WHERE userid = $1 AND planid = $2;
      `,
      [userid, planid]
    );
    return res.rows[0];
  },
  addPlannerEntry: async (userid, data) => {
    const res = await query(
      `INSERT INTO plannerentries (planid, title, notification, color, repeat, time, dep, orig_ref, orig_type, dest_ref, dest_type, exclmeans, changespeed, routetype, maxchanges, startdate, enddate, userid) 
        VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING *;
        `,
      [
        data.title,
        data.notification,
        data.color,
        data.repeat,
        data.time,
        data.dep,
        data.origref,
        data.origtype,
        data.destref,
        data.desttype,
        data.exclmeans,
        data.changespeed,
        data.routetype,
        data.maxchanges,
        data.startdate,
        data.enddate,
        userid,
      ]
    );
    return res.rows[0];
  },
  delPlannerEntry: async (userid, planid) => {
    const res = await query(
      `DELETE
      FROM plannerentries
      WHERE planid = $1
        AND userid = $2
      RETURNING *;`,
      [planid, userid]
    );
    return res.rows[0];
  },
};
