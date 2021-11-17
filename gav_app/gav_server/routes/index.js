const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  res.send('Test login');
});

module.exports = router;
