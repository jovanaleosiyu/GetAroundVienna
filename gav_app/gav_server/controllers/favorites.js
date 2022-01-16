const asyncHandler = require('express-async-handler');
const dbInfo = require('debug')('INFO');
const favorites = require('../model/favorites');

module.exports = {
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
