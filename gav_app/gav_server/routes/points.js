const express = require('express');
const { getPoints } = require('../controllers/points');

const router = express.Router();

router.get('/:searchname', getPoints);
module.exports = router;
