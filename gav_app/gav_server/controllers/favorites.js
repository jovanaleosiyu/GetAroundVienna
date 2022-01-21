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
  addFavTrip: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const { title, icon, color, origRef, origType, destRef, destType } =
        req.body;
      if (
        title &&
        icon &&
        color &&
        origRef &&
        origType &&
        destRef &&
        destType
      ) {
        const options = req.body.options ?? {};
        const favid = await favorites.addFavTrip(
          title,
          icon,
          color,
          origRef,
          origType,
          destRef,
          destType,
          userid,
          options
        );
        dbInfo(`User with ID:${userid} created favorite trip with ID:${favid}`);
        res.status(200).json(favid);
      } else res.status(400).send('Required Content missing.');
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
  delFavorite: asyncHandler(async (req, res) => {
    const { userid } = req.session;
    if (userid) {
      const { favid } = req.params;
      if (favid) {
        const row = await favorites.delFavorite(userid, favid);
        if (row) {
          dbInfo(`User with ID:${userid} deleted favorite with ID:${favid}`);
          res.status(200).end();
        } else res.status(404).send('Favorite not found.');
      } else res.status(400).send('Required Content missing.');
    } else {
      res.status(403).send('No User logged in.');
    }
  }),
};
