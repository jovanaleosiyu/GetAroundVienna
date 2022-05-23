module.exports = {
  // eslint-disable-next-line no-unused-vars
  errorHandler: (err, _req, res, _next) => {
    console.log(`ERROR ===> ${err.message}`.red.inverse);
    res.status(err.status || 500).send(err.message);
  },
  notFoundHandler: (req, res) => {
    console.log(`Not Found ===> ${req.originalUrl}`.blue);
    res.status(404).send('The requested resource was not found.');
  },
};
