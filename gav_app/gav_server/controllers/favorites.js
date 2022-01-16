const asyncHandler = require('express-async-handler');
const dbInfo = require('debug')('INFO');
const favorites = require('../model/favorites');

module.exports = {
  getFavorites: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const { type } = req.query;
      dbInfo(type);
      let rows;
      switch (type) {
        case 'point':
          rows = await favorites.getFavPoints(userid);
          break;
        case 'trip':
          res.status(501).send('Not implemented yet.');
          return;
        // break;
        default:
          rows = await favorites.getFavorites(userid);
      }
      res.status(200).json(rows);
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
  getFavPoints: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const rows = await favorites.getFavPoints(userid);
      res.status(200).json(rows);
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
  getFavorite: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const favid = Number(req.params.favid);
      const row = await favorites.getFavorite(favid, userid);
      if (row) {
        res.status(200).json(row);
      } else {
        res
          .status(404)
          .send(`Favorite with ID:${favid} not found or user not authorized.`);
      }
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
  addFavPoint: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const { title, icon, color, ref, type } = req.body;
      if (title && icon && color && ref && type) {
        const favid = await favorites.addFavPoint(
          title,
          icon,
          color,
          ref,
          type,
          userid
        );
        dbInfo(
          `User with ID:${userid} created favorite point with ID:${favid}`
        );
        res.status(200).json(favid);
      } else res.status(400).send('Required Content missing.');
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
};
