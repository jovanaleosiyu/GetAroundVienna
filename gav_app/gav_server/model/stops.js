/* eslint-disable no-restricted-syntax */
const stopinfo = require('./stopinfo.json');

module.exports = {
  getStopList() {
    const uniqStopNames = [];
    for (const si of stopinfo) {
      if (!uniqStopNames.includes(si.StopText)) uniqStopNames.push(si.StopText);
    }
    return uniqStopNames;
  },
};
