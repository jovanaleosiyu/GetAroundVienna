module.exports = {
  authorized: (req, res, next) => {
    if (req.session.userid) return next();
    const err = new Error('Not authorized! Please log in first.');
    err.status = 401;
    return next(err);
  },
};
