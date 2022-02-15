const asyncHandler = require('express-async-handler');
const dbInfo = require('debug')('INFO');
const planner = require('../model/planner');

module.exports = {
  getPlannerEntries: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const rows = await planner.getPlannerEntries(userid);
      res.status(200).json(rows);
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
  getPlannerEntry: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const row = await planner.getPlannerEntry(userid, req.params.id);
      if (row) res.status(200).json(row);
      else res.status(404).json('Not found.');
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
  addPlannerEntry: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const row = await planner.addPlannerEntry(userid, req.body);
      res.status(200).json(row.planid);
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
  delPlannerEntry: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const row = await planner.delPlannerEntry(userid, req.params.id);
      if (row) {
        dbInfo(`User with ID:${userid} deleted favorite with ID:${row.planid}`);
        res.status(200).end();
      } else {
        res.status(404).send('Entry not found.');
      }
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
};
