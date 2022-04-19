const express = require('express');
const user = require('../controllers/user');

const router = express.Router();

router.get('/', user.getUser);
router.get('/widgets', user.getUserWidgets);
router.get('/settings', user.getUserSetting);
router.patch('/widgets', user.updUserWidgets);
router.patch('/darkmode', user.updUserDarkMode);
router.patch('/colortheme', user.updUserColorTheme);

module.exports = router;
