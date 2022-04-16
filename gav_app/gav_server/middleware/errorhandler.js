const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log(`ERROR ===> ${err.message}`.red.inverse);
    console.log(err);
  } else {
    next();
  }
};

const notFoundHandler = (req, res) => {
  console.log(`Not Found ===> ${req.originalUrl}`.blue);
  res.status(404).send('The requested resource was not found');
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
