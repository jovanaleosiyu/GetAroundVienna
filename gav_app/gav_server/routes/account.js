const express = require('express');
const account = require('../controllers/account');

const router = express.Router();

router.post('/login', account.login);
router.post('/register', account.register);
router.get('/logout', account.logout);
router.get('/user', account.getUser);
router.get('/loggedin', account.loggedIn);

module.exports = router;
