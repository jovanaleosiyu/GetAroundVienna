module.exports = {
  restrict: (req, res, next) => {
    if (req.session.userid) return next();
    const err = new Error('Not authorized! Please log in first.');
    err.status = 400;
    return next(err);
  },
};
