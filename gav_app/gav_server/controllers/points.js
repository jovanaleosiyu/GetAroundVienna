const asyncHandler = require('express-async-handler');
const axios = require('axios');
const dbUrl = require('debug')('API_CALL');

const baseUrl =
  'https://www.wienerlinien.at/ogd_routing/XML_TRIP_REQUEST2?' +
  'locationServerActive=1&' +
  'outputFormat=JSON&' +
  'coordOutputFormat=WGS84[DD.ddddd]&' +
  'anyObjFilter_origin=10&';

const structurePoint = (point) => {
  const p = { ...point };
  if (p.anyType) p.type = p.anyType;
  return {
    name: p.name,
    type: p.type === 'stop' ? 'stop' : 'coord',
    ref:
      p.type === 'stop' ? p.ref.id : `${p.ref.coords.replace(',', ':')}:WGS84`,
  };
};

const getPointsFromApi = async (res, queryString) => {
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
};

module.exports = {
  getPoints: asyncHandler(async (req, res) => {
    const { searchname } = req.params;
    const queryString = encodeURI(`type_origin=any&name_origin=${searchname}`);
    await getPointsFromApi(res, queryString);
  }),
  getPointsName: asyncHandler(async (req, res) => {
    const { type, ref } = req.params;
    const queryString = encodeURI(`type_origin=${type}&name_origin=${ref}`);
    await getPointsFromApi(res, queryString);
  }),
};
