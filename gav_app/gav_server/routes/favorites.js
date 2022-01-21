const express = require('express');
const {
  addFavPoint,
  addFavTrip,
  getFavorites,
  getFavorite,
  delFavorite,
} = require('../controllers/favorites');

const router = express.Router();

router.get('/', getFavorites);
router.get('/:favid', getFavorite);
// router.get('?type=trip', );
router.post('/points', addFavPoint);
router.post('/trips', addFavTrip);
router.delete('/:favid', delFavorite);

module.exports = router;
