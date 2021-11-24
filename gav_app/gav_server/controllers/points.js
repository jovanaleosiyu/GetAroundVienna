const asyncHandler = require('express-async-handler');
const axios = require('axios');
const querystring = require('querystring');

const url =
  'https://www.wienerlinien.at/ogd_routing/XML_TRIP_REQUEST2?' +
  'locationServerActive=1&' +
  'outputFormat=JSON&' +
  'coordOutputFormat=WGS84[DD.ddddd]&' +
  'anyObjFilter_origin=10&' +
  'type_origin=any&';

module.exports = {
  getPoints: asyncHandler(async (req, res) => {
    const { searchName } = req.body;
    const queryString = querystring.encode({ name_origin: searchName });
    const { data } = await axios.get(url + queryString);
    const { points } = data.origin;
    if (points) {
      res.status(200).json(
        points.map((p) => ({
          name: p.name,
          type: p.anyType,
          ref: p.anyType === 'stop' ? p.ref.id : p.ref.coords,
        }))
      );
    } else res.status(404).send('No points found.');
  }),
};
