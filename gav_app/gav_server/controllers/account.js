const asyncHandler = require('express-async-handler');
const dbInfo = require('debug')('INFO');
const users = require('../model/users');

module.exports = {
  register: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = (await users.getUsers()).find((u) => u.email === email);
      if (user) res.status(409).send('Email already registered');
      else {
        const newRow = await users.addUser(email, password);
        dbInfo(`User with ID:${newRow.userid} registered.`);
        req.session.userid = newRow.userid;
        res.status(200).json(newRow.userid);
      }
    } else res.status(400).send('Email and password missing');
  }),
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = (await users.getUsers()).find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        dbInfo(`User with ID:${user.userid} logged in.`);
        req.session.userid = user.userid;
        res.status(200).json(user.userid);
      } else res.status(401).send('Wrong email or password');
    } else res.status(400).send('Email or password missing');
  }),
  logout: asyncHandler(async (req, res) => {
    if (req.session.userid) {
      dbInfo(`User with ID:${req.session.userid} logged out.`);
      req.session.destroy();
      res.clearCookie(process.env.SESSION_NAME);
      res.status(200).send('User successfully logged out');
    } else res.status(400).send('Already logged out');
  }),
  getUser: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const user = await users.getUser(userid);
      res.status(200).json(user);
    } else res.status(403).send('No user logged in.');
  }),
};
