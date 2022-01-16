const express = require('express');
const {
  addFavPoint,
  getFavorites,
  getFavorite,
} = require('../controllers/favorites');

const router = express.Router();

router.get('/', getFavorites);
router.get('/:favid', getFavorite);
// router.get('?type=trip', );
router.post('/points', addFavPoint);

module.exports = router;
