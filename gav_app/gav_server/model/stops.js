/* eslint-disable no-restricted-syntax */
const stopinfo = require('./stopinfo.json');

module.exports = {
  getStopList() {
    const uniqStopNames = [];
    for (const si of stopinfo) {
      if (si.StopText && !uniqStopNames.includes(si.StopText)) {
        uniqStopNames.push({
          name: si.StopText,
          DIVA: si.DIVA,
        });
      }
    }
    return uniqStopNames;
  },
};
