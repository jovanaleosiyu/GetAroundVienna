const express = require('express');
const { addFavPoint } = require('../controllers/favorites');

const router = express.Router();

// router.get('/', );
// router.get('?type=point', );
// router.get('?type=trip', );
router.post('/points', addFavPoint);

module.exports = router;
