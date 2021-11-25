const express = require('express');
const { getPoints } = require('../controllers/points');

const router = express.Router();

router.get('/', getPoints);
module.exports = router;
