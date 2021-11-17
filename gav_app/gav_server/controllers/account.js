const asyncHandler = require('express-async-handler');
const users = require('../model/users');

module.exports = {
  register: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      const user = (await users.getUsers()).find((u) => u.email === email);
      if (user) res.status(409).send('Email already registered');
      else {
        const newRow = await users.addUser(email, password);
        console.log(newRow);
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
        req.session.userid = user.userid;
        res.status(200).json(user.userid);
      } else res.status(401).send('Wrong email or password');
    } else res.status(400).send('Email or password missing');
  }),
  logout: asyncHandler(async (req, res) => {
    req.session.destroy();
    res.clearCookie(process.env.SESSION_NAME);
    res.status(200).json('User successfully logged out');
  }),
};
