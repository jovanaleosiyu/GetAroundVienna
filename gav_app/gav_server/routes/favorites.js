const express = require('express');
const {
  addFavPoint,
  addFavTrip,
  getFavorites,
  getFavorite,
  delFavorite,
  updFavPoint,
  updFavTrip,
} = require('../controllers/favorites');

const router = express.Router();

router.get('/', getFavorites);
router.get('/:favid', getFavorite);
router.post('/points', addFavPoint);
router.post('/trips', addFavTrip);
router.delete('/:favid', delFavorite);
router.patch('/points/:favid', updFavPoint);
router.patch('/trips/:favid', updFavTrip);

module.exports = router;
