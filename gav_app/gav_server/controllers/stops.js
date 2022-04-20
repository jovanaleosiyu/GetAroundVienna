/* eslint-disable no-restricted-syntax */
const asyncHandler = require('express-async-handler');
const axios = require('axios');
const dbUrl = require('debug')('API_CALL');
const stops = require('../model/stops');

module.exports = {
  getStopList: asyncHandler(async (req, res) => {
    res.status(200).json(stops.getStopList());
  }),
  getStopMonitors: asyncHandler(async (req, res) => {
    const { diva } = req.params;
    const url =
      'https://www.wienerlinien.at/ogd_realtime/monitor?' +
      'activateTrafficInfo=stoerunglang&' +
      'activateTrafficInfo=stoerungkurz&' +
      'activateTrafficInfo=aufzugsinfo&' +
      'activateTrafficInfo=fahrtreppeninfo&' +
      'activateTrafficInfo=information&' +
      'diva=';
    dbUrl(url + diva);
    const result = await axios.get(url + diva);
    const monitors = [];
    const { data } = result.data;
    for (const m of data.monitors) {
      if (m.lines.length > 1) {
        throw new Error('Lines too long. Contact server admin');
      }
      const monitor = {
        // DIVA: diva,
        stopName: m.locationStop.properties.title, // eg Praterstern
        lineName: m.lines[0].name, // eg 13A
        towards: m.lines[0].towards,
        barrierFree: m.lines[0].barrierFree,
        departures: m.lines[0].departures.departure.map((d) => ({
          ...d.departureTime,
        })),
        type: m.lines[0].type,
      };
      const { refTrafficInfoNames } = m;
      if (refTrafficInfoNames) {
        const ti = data.trafficInfos.find(
          (t) => t.name === refTrafficInfoNames
        );
        if (ti) {
          monitor.trafficInfo = {
            title: ti.title,
            description: ti.description,
            start: ti.time.start,
            end: ti.time.end,
            category: data.trafficInfoCategories.find(
              (tic) => tic.id === ti.refTrafficInfoCategoryId
            ).title,
          };
        }
      }
      monitors.push(monitor);
    }
    res.status(200).json(monitors);
  }),
};
