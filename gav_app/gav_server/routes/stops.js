const express = require('express');
const stops = require('../controllers/stops');

const router = express.Router();
router.get('/', stops.getStopList);
module.exports = router;
