const express = require('express');
const { getTrip } = require('../controllers/trip');

const router = express.Router();

router.get('/', getTrip);
// router.get('/prev');
// router.get('/next');
// router.get('/last');
// router.get('/first');

module.exports = router;
