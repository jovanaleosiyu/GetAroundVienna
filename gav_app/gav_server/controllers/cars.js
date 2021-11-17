const getCars = (req, res) => {
  res.send('A lot of cars');
};

const delCar = (req, res) => {
  res.send(`A lot of cars! ${req.params.id}`);
};

module.exports = {
  getCars,
  delCar,
};
