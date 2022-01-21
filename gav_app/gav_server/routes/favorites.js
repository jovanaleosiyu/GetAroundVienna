const express = require('express');
const {
  addFavPoint,
  addFavTrip,
  getFavorites,
  getFavorite,
} = require('../controllers/favorites');

const router = express.Router();

router.get('/', getFavorites);
router.get('/:favid', getFavorite);
// router.get('?type=trip', );
router.post('/points', addFavPoint);
router.post('/trips', addFavTrip);

module.exports = router;
