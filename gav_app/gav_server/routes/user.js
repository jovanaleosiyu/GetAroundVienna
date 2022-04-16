const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router.get('/', user.getUser);
router.get('/widgets', user.getUserWidgets);
router.patch('/widgets', user.updUserWidgets);

module.exports = router;
