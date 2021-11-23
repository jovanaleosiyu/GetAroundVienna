const asyncHandler = require('express-async-handler');
// const axios = require('axios');
// const querystring = require('querystring');

// const url = ""

module.exports = {
  getTrip: asyncHandler(async (req, res) => {
    res.status(200).send('Trip');
  }),
};
