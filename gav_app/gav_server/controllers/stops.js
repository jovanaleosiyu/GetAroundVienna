const asyncHandler = require('express-async-handler');
const stops = require('../model/stops');

module.exports = {
  getStopList: asyncHandler(async (req, res) => {
    res.status(200).json(stops.getStopList());
  }),
};
