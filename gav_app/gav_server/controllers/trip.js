const asyncHandler = require('express-async-handler');
const axios = require('axios');

const url =
  'https://www.wienerlinien.at/ogd_routing/XML_TRIP_REQUEST2?' +
  'outputFormat=JSON&' +
  'coordOutputFormat=WGS84[DD.ddddd]&' +
  'ptOptionsActive=1&';

module.exports = {
  getTrip: asyncHandler(async (req, res) => {
    const {
      // required
      typeOrigin,
      nameOrigin,
      typeDestination,
      nameDestination,
      // optional - time
      depArr,
      date,
      time,
      maxChanges,
      routeType,
      changeSpeed,
    } = req.query;
    let queryString = `type_origin=${typeOrigin}&name_origin=${nameOrigin}&type_destination=${typeDestination}&name_destination=${nameDestination}`;
    console.log(req.query);
    // Time and Date
    if (depArr) queryString += `&itdTripDateTimeDepArr=${depArr}`;
    if (time) queryString += `&itdTime=${time}`;
    if (date) queryString += `&itdDate=${date}`;
    if (maxChanges) queryString += `&maxChanges=${maxChanges}`;
    if (routeType) queryString += `&routeType=${routeType}`;
    if (changeSpeed) queryString += `&changeSpeed=${changeSpeed}`;
    console.log(url + queryString);
    const { data } = await axios.get(url + queryString);
    const trips = data.trips.map((t) => ({
      duration: t.duration,
      interchange: t.interchange,
      steps: t.legs.map((l) => {
        const start = l.points.find((p) => p.usage === 'departure');
        const end = l.points.find((p) => p.usage === 'arrival');
        let stopSeq;
        if (l.stopSeq) {
          stopSeq = l.stopSeq.map((s) => ({
            name: s.name,
            coords: s.ref.coords,
            datetime: s.ref.depDateTime ?? s.ref.arrDateTime,
          }));
        }
        let turnInst;
        if (l.turnInst) {
          turnInst = l.turnInst.map((ti) => ({
            name: ti.name,
            dir: ti.dir,
          }));
        }
        return {
          mode: {
            name: l.mode.name,
            type: l.mode.product,
            direction: l.mode.destination,
          },
          duration: l.timeMinute,
          start: {
            name: start.name,
            time: start.dateTime.time,
            date: start.dateTime.date,
            coords: start.ref.coords,
          },
          end: {
            name: end.name,
            time: end.dateTime.time,
            date: end.dateTime.date,
            coords: end.ref.coords,
          },
          stopSeq,
          turnInst,
          // path: l.path,
        };
      }),
    }));
    res.status(200).json(trips);
  }),
};
