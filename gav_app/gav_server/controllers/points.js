const asyncHandler = require('express-async-handler');
const axios = require('axios');
const dbUrl = require('debug')('API_CALL');

const baseUrl = 'https://www.wienerlinien.at/ogd_routing/XML_TRIP_REQUEST2?'
  + 'locationServerActive=1&'
  + 'outputFormat=JSON&'
  + 'coordOutputFormat=WGS84[DD.ddddd]&'
  + 'anyObjFilter_origin=10&'
  + 'type_origin=any&name_origin=';

const structurePoint = (p) => ({
  name: p.name,
  type: p.anyType === 'stop' ? 'stop' : 'coord',
  ref:
    p.anyType === 'stop' ? p.ref.id : `${p.ref.coords.replace(',', ':')}:WGS84`,
});

module.exports = {
  getPoints: asyncHandler(async (req, res) => {
    const searchName = req.params.searchname;
    const queryString = encodeURI(searchName);
    const url = baseUrl + queryString;
    dbUrl(url);
    const { data } = await axios.get(baseUrl + queryString);
    const { points } = data.origin;
    if (points) {
      if (points instanceof Array) {
        res.status(200).json(points.map((p) => structurePoint(p)));
      } else {
        res.status(200).send(structurePoint(points.point));
      }
    } else res.status(404).send('No points found.');
  }),
};
