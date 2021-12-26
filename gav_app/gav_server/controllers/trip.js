const asyncHandler = require('express-async-handler');
const axios = require('axios');
const dbUrl = require('debug')('API_CALL');
const dbVerify = require('debug')('VERIFY_CALL');

const baseUrl = 'https://www.wienerlinien.at/ogd_routing/XML_TRIP_REQUEST2?'
  + 'outputFormat=JSON&'
  + 'coordOutputFormat=WGS84[DD.ddddd]&'
  + 'ptOptionsActive=1&'
  + 'useProxFootSearch=1&';

module.exports = {
  getTrip: asyncHandler(async (req, res) => {
    const {
      // required
      typeOrigin,
      nameOrigin,
      typeDestination,
      nameDestination,
      // optional
      depArr,
      date,
      time,
      maxChanges,
      routeType,
      changeSpeed,
      excludedMeans,
    } = req.query;
    // Querystring
    let queryString = `type_origin=${typeOrigin}&name_origin=${nameOrigin}&type_destination=${typeDestination}&name_destination=${nameDestination}&`;
    if (depArr) queryString += `itdTripDateTimeDepArr=${depArr}&`;
    if (time) queryString += `itdTime=${time}&`;
    if (date) queryString += `itdDate=${date}&`;
    if (maxChanges) queryString += `maxChanges=${maxChanges}&`;
    if (routeType) queryString += `routeType=${routeType}&`;
    if (changeSpeed) queryString += `changeSpeed=${changeSpeed}&`;
    // Excluded Means
    if (excludedMeans) {
      const emarr = excludedMeans.split(';');
      // Verify here
      if (
        !emarr.every((e) => e !== '' && !Number.isNaN(e) && e >= 0 && e <= 11)
      ) {
        res.status(400).send('Invalid Excluded Means');
        return;
      }
      queryString += emarr.reduce((p, c) => `${p}excludedMeans=${c}&`, '');
    }
    // Verify Points
    const verifyUrl = `${baseUrl}${queryString}execInst=verifyOnly&`;
    dbVerify(verifyUrl);
    const verify = (await axios.get(verifyUrl)).data;
    if (!verify.origin.points || !verify.destination.points) {
      res.status(400).send('Invalid origin or destination');
      return;
    }
    // Verify Options
    const vdtm = verify.dateTime.message;
    if (vdtm) {
      const err = vdtm.find((m) => m.name === 'error');
      res.status(400).send(`Invalid Datetime: ${err.value}`);
      return;
    }
    if (depArr && verify.dateTime.deparr !== depArr) {
      res.status(400).send('Invalid depArr');
      return;
    }
    const vpt = verify.option.ptOption;
    if (maxChanges && vpt.maxChanges !== maxChanges) {
      res.status(400).send('Invalid max changes');
      return;
    }
    if (routeType && vpt.routeType !== routeType.toUpperCase()) {
      res.status(400).send('Invalid route type');
      return;
    }
    if (changeSpeed && vpt.changeSpeed !== changeSpeed) {
      res.status(400).send('Invalid change Speed');
      return;
    }
    // Get Trip
    const url = baseUrl + queryString;
    dbUrl(url);
    const { data } = await axios.get(url);
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
