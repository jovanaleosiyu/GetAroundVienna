const express = require('express');
const points = require('../controllers/points');

const router = express.Router();

router.get('/:searchname', points.getPoints);
router.get('/:type/:ref', points.getPointsName);

module.exports = router;
