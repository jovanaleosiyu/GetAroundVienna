const asyncHandler = require('express-async-handler');
const users = require('../model/users');

module.exports = {
  getUser: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    const user = await users.getUser(userid);
    res.status(200).json(user);
  }),
  getUserWidgets: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    const { widgets } = await users.getUserWidgets(userid);
    res.status(200).json(widgets.split(';').map(Number));
  }),
  getUserSetting: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    const rows = await users.getUserSettings(userid);
    res.status(200).json(rows);
  }),
  updUserWidgets: asyncHandler(async (req, res) => {
    if (!(req.body instanceof Array) || req.body.length > 4) {
      res.status(400).send('Required Content missing or wrong.');
    } else {
      const { userid } = req.session;
      await users.updUserWidgets(userid, req.body.join(';'));
      res.status(200).end();
    }
  }),
  updUserDarkMode: asyncHandler(async (req, res) => {
    if (!req.body && !req.body.darkMode) {
      res.status(400).send('Required Content missing or wrong.');
    } else {
      const { userid } = req.session;
      await users.updUserDarkMode(userid, req.body.darkMode);
      res.status(200).end();
    }
  }),
  updUserColorTheme: asyncHandler(async (req, res) => {
    if (!req.body && !req.body.color) {
      res.status(400).send('Required Content missing or wrong.');
    } else {
      const { userid } = req.session;
      await users.updUserColorTheme(userid, req.body.color);
      res.status(200).end();
    }
  }),
};
