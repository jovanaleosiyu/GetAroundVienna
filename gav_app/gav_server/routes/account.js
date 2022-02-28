const express = require('express');
const { login, logout, register, getUser } = require('../controllers/account');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.get('/user', getUser);

module.exports = router;
